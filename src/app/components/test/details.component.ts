import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Config } from '../../config';
import { EnumQueryType } from '../../models/list.model';
@Component({
  template: `
    <div  class="container"></div>
  `
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule]
})
export class TestdetailsComponent implements OnInit {


  constructor( private _http: HttpClient) {
    //
  }
  ngOnInit(): void {
    // test different query types

    // this.resourceService.QueryResource({
    //   "type": "spaces",
    //   "space_name": "management",
    //   "subpath": "/",
    //   "search": "",
    //   "limit": 100
    // }).subscribe(d => {
    //   _attn(d, 'management');
    // });

    // first: type = "spaced" ignores everything else and gets root spaces, but space_name cannot be empty
    // but it doesnt matter what it has
    // to get folder, subpath contains the folder name
    // to get content, it should in filters_shortnames, lenno its a sub resource
    this.QueryResource({
      type: EnumQueryType.SEARCH,
      space_name: 'Ayyash', // always root space
      subpath: '/schema', // starts with / +subpath + / + shortname
      search: '',
      limit: 200,
      exact_subpath: true, // this brings one level at a time of folders and content, nothing else.
      retrieve_json_payload: true, // gets nodes payload
      // filter_types: [EnumResourceType.CONTENT, EnumResourceType.FOLDER]
      filter_shortnames: ['folder_rendering']
    }).subscribe(d => {
      _attn(d, 'types search');
    });

    // /managed/entry/:resource/:space/:subpath/:shortnam
    /* https://api.dmart.cc/managed/entry/space/Ayyash/__root__/Ayyash?retrieve_json_payload=false&retrieve_attachments=false&validate_schema=true */
    // /folder/Ayyash/__root__/pages
    // folder needs space/root/foldername
    // space needs space/root/space

    // entry/schema/space/schema/shortname
    // entry/content/Ayyash/__root__/text_content2
    // /entry/folder/Ayyash/pages/asd

    // schema folders are special folders that have resources SCHEMA only
    // /folder/Ayyash/__root__/schema
    // managed/entry/:resource/:space/:subpath?:options
    // this.EntryResource(`/managed/entry/folder/Ayyash/__root__/pages`).subscribe(d => _attn(d, 'entry'));


  }

  // test urls
  QueryResource(options: any): Observable<any> {

    return this._http.post(Config.API.resource.query, options);
  }
  EntryResource(url: any): Observable<any> {

    // /managed/entry/:resource/:space/:subpath/:shortnam
    return this._http.get(url);
  }
}
