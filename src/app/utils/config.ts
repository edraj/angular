import { environment } from '../../environments/environment';


export const Config = {
    isServed: false,
    Basic: {
        country: 'jo',
        defaultRoute: '/',
        defaultSize: 25,
        defaultDateFormt: 'DD-MM-YYYY',
        defaultUploadSize: 1048576,
        defaultUploadFormat: ['gif', 'jpg', 'jpeg', 'png'],
        defaultToastTimeout: 5000
    },
    Res: {
      cookieName: 'cr-lang', // for netlify it's nf_lang
      languages: [{name: 'en', display: 'English'}, {name: 'ar', display: 'عربي'}],
      defaultLanguage: 'en' // not maintained
  },
    Auth: {
        userAccessKey: 'dmart.user'
    },
    Storage: {
        Timeout: 1,
        Key: 'localkey',
        ResetKey: '20180220'
    },
    Seo: {
        gaEnabled: true,
        tags: [
            { property: 'og:site_name', content: 'Dmart' },
            { property: 'og.type', content: 'website' },
            { property: 'twitter:site', content: '@dmart' },
            { property: 'twitter:card', content: 'summary_large_image' },
            { property: 'twitter:creator', content: '@dmart' },
            { name: 'author', content: 'Ayyash' }
        ],
        baseUrl: 'https://$0.dmart.com/$1/$2', // for multiregional multilingual
        defaultImage: 'dmart-image-url',
        logoUrl: 'logo-url',
        defaultLanguage: 'en',
        defaultRegion: 'www',
        hrefLangs: [
            { region: 'COUNTRY_CODE', language: 'LANGUAGE' },
            { language: 'LANGUAGE' },
            { language: 'x-default' }
          ]
    },
    API: {
        apiRoot: environment.apiRoot,
        apiVersion: 1,
        data: {
            notdefined: '/data/notdefined'
        },
        config: {
            local: environment.localConfig
        }
         // **gulpmodel**
    }
};

