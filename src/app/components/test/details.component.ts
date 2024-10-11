import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnumQueryType } from '../../models/list.model';
import { EnumResourceType } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
@Component({
  template: `
    <div  class="container"></div>
  `
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule]
})
export class TestdetailsComponent implements OnInit {


  constructor(private resourceService: ResourceService) {
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
    this.resourceService.QueryResource({
      type: EnumQueryType.SEARCH,
      space_name: 'Ayyash', // always root space
      subpath: '/pages', // starts with / +subpath + / + shortname
      search: '',
      limit: 200,
      exact_subpath: true, // this brings one level at a time of folders and content, nothing else.
      // retrieve_json_payload: true, // gets nodes payload
      filter_types: [ EnumResourceType.CONTENT, EnumResourceType.FOLDER]
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
    // this.resourceService.EntryResource(`/managed/entry/folder/Ayyash/pages/asd/mimi`).subscribe(d => _attn(d, 'entry'));
  }
}
