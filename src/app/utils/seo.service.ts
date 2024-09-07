import { Injectable } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';
import { Res } from '../utils/resources';
import { Platform } from './platform.service';
import { Config } from '../utils/config';
import { GetMatrixParamsAsString, toFormat } from '../utils/common';
import { environment } from '../../environments/environment';
import { IListOptions, ListOptions } from '../models/list.model';


@Injectable({
   providedIn: 'root'
})
export class SeoService {

   private _canonicalLink: HTMLLinkElement;
   private _alternateLinks: HTMLLinkElement[] = [];

   private _jsonSnippet: HTMLScriptElement;
   private _graphObjects: any[] = [];

   constructor(
      private title: Title,
      private meta: Meta,
      private platform: Platform
   ) {
      this.AddTags();
   }


   private AddTags() {

      // add tags
      this.meta.addTags(Config.Seo.tags);


      // if (environment.production && this.platform.isBrowser) return;
      const _canonical = this.platform.doc.querySelector('link[rel="canonical"]');
      this._canonicalLink = (_canonical as HTMLLinkElement) || this.createCanonicalLink();


      const _links = this.platform.doc.querySelectorAll('link[rel="alternate"]');
      if (_links.length > 0) {
         this._alternateLinks = Array.from(_links) as HTMLLinkElement[];
      } else {
         this._alternateLinks = Config.Seo.hrefLangs.map(n => this.createAlternateLink());
      }

      // create the initial ld+json script
      this._jsonSnippet = this.platform.doc.querySelector('script[type="application/ld+json"]') || this.createJsonSnippet();


   }
   get url(): string {
      let url = this.platform.doc.location.pathname;
      if (url.indexOf(';') > -1) {
         url = url.substring(0, url.indexOf(';'));
      }
      return url;
   }

   get defaultUrl(): string {
      return toFormat(Config.Seo.baseUrl, Config.Seo.defaultRegion, Config.Seo.defaultLanguage, '');
   }
   get siteUrl(): string {
      return toFormat(Config.Seo.baseUrl, Config.Basic.country, Res.language, '');
   }

   private createAlternateLink(): HTMLLinkElement {
      // append alternate link to body
      const _link = this.platform.doc.createElement('link');
      _link.setAttribute('rel', 'alternate');
      this.platform.doc.head.appendChild(_link);
      return _link;
   }


   private createCanonicalLink(): HTMLLinkElement {

      const _canonicalLink = this.platform.doc.createElement('link');
      _canonicalLink.setAttribute('rel', 'canonical');
      this.platform.doc.head.appendChild(_canonicalLink);
      return _canonicalLink;

   }
   private createJsonSnippet(): HTMLScriptElement {
      // if (this.platform.isBrowser) return null;

      const _script = this.platform.doc.createElement('script');
      _script.setAttribute('type', 'application/ld+json');

      this.platform.doc.body.appendChild(_script);
      return _script;
   }



   protected setTitle(title: string) {
      const _title = `${title} - ${Res.Get('SITE_NAME')}`;

      this.title.setTitle(_title);
      this.meta.updateTag({ name: 'title', property: 'og:title', content: _title });
      this.meta.updateTag({ property: 'twitter:title', content: _title });

   }
   protected setDescription(description: string) {
      this.meta.updateTag({ name: 'description', property: 'og:description', content: description });
   }
   protected setImage(imageUrl?: string) {
      // prepare image, either passed or
      const _imageUrl = imageUrl || (Config.Seo.defaultImage);

      this.meta.updateTag({ name: 'image', property: 'og:image', content: _imageUrl });
      this.meta.updateTag({ property: 'twitter:image', content: _imageUrl });

   }
   protected setUrl(params?: IListOptions) {
      // if (environment.production && this.platform.isBrowser) return;

      // prefix with baseUrl and remove language, but not in development
      const path = this.platform.doc.location.pathname.substring(
         environment.production ? 4 : 1
      );

      let url = this.siteUrl + path;

      if (url.indexOf(';') > -1) {
         url = url.substring(0, url.indexOf(';'));

      }
      // if category or page exist, append them as query params
      if (params) {
         const s = new URLSearchParams();
         params.page && s.append('page', params.page.toString());
         url += '?' + s.toString();
      }

      // set attribute and og:url
      this._canonicalLink.setAttribute('href', url);
      this.meta.updateTag({ property: 'og:url', content: url });

      this.setAlternateLinks(path);

   }

   protected setAlternateLinks(path: string) {
      // for each config hrefLang, set the link that already exists

      Config.Seo.hrefLangs.forEach((n, i) => {
         // what is the right language
         let lang = n.language;
         if (lang === 'x-default') lang = Config.Seo.defaultLanguage;

         // construct the url
         const url = toFormat(
            Config.Seo.baseUrl,
            n.region || Config.Seo.defaultRegion,
            lang,
            path
         );

         // construct hreflang
         const hreflang = n.language + (n.region ? '-' + n.region : '');
         this._alternateLinks[i].setAttribute('href', url);
         this._alternateLinks[i].setAttribute('hreflang', hreflang);

      });
   }



   protected updateJsonSnippet(schema: any) {
      // if (this.platform.isBrowser) return;
      const found = this._graphObjects.findIndex((n) => n['@type'] === schema['@type']);

      if (found > -1) {
         this._graphObjects[found] = schema;
      } else {
         this._graphObjects.push(schema);
      }

      const _graph = {
         '@context': 'https://schema.org',
         '@graph': this._graphObjects,
      };
      this._jsonSnippet.textContent = JSON.stringify(_graph);
   }


   setPage(key: string) {
      // set generic page title (brought from data)
      const pageKey: any = Res.Get('PAGE_TITLES') || {};
      const _title = pageKey[key] || Res.Get('DEFAULT_PAGE_TITLE');
      this.setTitle(_title);

      this.setUrl();

   }

   getNextLink(params: IListOptions): string {
      // add 1 to page, append url and return
      const _params = { ...params, page: (params.page || 1) + 1 };
      return this.url + GetMatrixParamsAsString(ListOptions.MapSeoOptions(_params));
   }


   getPagePath() {
      return this.platform.doc.location.pathname;
   }



   // example feature seo service
   /*
    setSearchResults(params: IListOptions, projects: IProject[]) {
       // Title: 34 projects in Turtles.
       // Desc: Found 34 projects categorized under Turtles.
       this.setTitle(toFormat(Res.Get('SEO_CONTENT')['PROJECT_RESULTS_TITLE'], params.total, params.category.value));

       this.setDescription(toFormat(Res.Get('SEO_CONTENT')['PROJECT_RESULTS_DESC'], params.total, params.category.value));
       this.setUrl(params);
       this.setImage();

       let i = 1;
       const url = this.siteUrl + 'projects/';
       this.updateJsonSnippet({
           '@type': 'ItemList',
           itemListElement: projects.map(n => {
               return {
                   '@type': 'ListItem',
                   url: url + n.id,
                   position: i++,
               };
           })
       });
   }
   */

}
