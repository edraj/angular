import { makeDate } from '../utils/common';
import { DataList, IList, IListOptions } from './list.model';
import { Translation } from './translation.model';

export enum EnumResourceType {
  FOLDER = 'folder',
  CONTENT = 'content',
  SCHEMA = 'schema',

  USER = 'user',
  GROUP = 'group',
  ACL = 'acl',
  COMMENT = 'comment',
  MEDIA = 'media',
  LOCATOR = 'locator',
  RELATIONSHIP = 'relationship',
  ALTERATION = 'alteration',
  HISTORY = 'history',
  SPACE = 'space',
  BRANCH = 'branch',
  PERMISSION = 'permission',
  ROLE = 'role',
  TICKET = 'ticket',
  JSON = 'json',
  POST = 'post',
  PLUGINWRAPPER = 'plugin_wrapper',
  NOTIFICATION = 'notification',
  JSONL = 'jsonl',
  CSV = 'csv',
  SQLITE = 'sqlite',
  PARQUET = 'parquet',
}

export interface IResource {
  id: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
  tags?: string[];
  description?: string;
  body?: any;
  contentType?: string;  // json, html...
  type?: EnumResourceType;
  schema?: string;
  subpath?: string;
  contentPath?: string;
  shortname?: string;
  displayname?: string;
  space?: string;
  path?: string;
}


export class Resource {

  static NewInstance(resource: any, options?: any): IResource {

    // never use __root here
    if (!resource) return null;
    // subpath may start at root with '/', remove it
    const _subpath = (`${resource.subpath}/${resource.shortname}`).replace('//', '');

    return {
      id: resource.uuid,
      shortname: resource.shortname,
      type: resource.resource_type,
      schema: resource.schema_shortname,
      created: makeDate(resource.created_at),
      updated: makeDate(resource.updated_at),
      isActive: resource.is_active,
      tags: resource.tags,
      displayname: Translation.MapLanguage(resource.displayname) || resource.shortname, // calculate per language
      description: Translation.MapLanguage(resource.description),
      body: resource.payload?.body,
      contentType: resource.payload?.content_type,
      subpath: _subpath, // not needed, this or path
      space: options?.space,
      path: `${options?.space}/${resource.resource_type}/${_subpath}`,
    };
  }
  static NewInstances(resources: any[]): IResource[] {
    return resources.map(n => Resource.NewInstance(n));
  }
  static NewList(dataset: any, options?: IListOptions): IList<IResource> {
    const dl = new DataList<IResource>();
    dl.mapper = (item: any) => Resource.NewInstance({ ...item, ...item?.attributes }, options);
    return dl.NewDataList(dataset);

  }
  static NewInstanceFromResponse(response: any, options?: IListOptions): IResource {
    // find "records[]", and match first one
    return Resource.NewInstance(response.records[0], options);
  }


  // prepare to POST
  static PrepCreate(resource: Partial<IResource>): any {

    return {
      space_name: resource.space,
      request_type: 'create',
      records: [
        {
          resource_type: resource.type,
          shortname: resource.shortname,
          subpath: resource.subpath || '/',
          attributes: {
            resource_type: resource.type,
            shortname: resource.shortname,
            space_name: resource.space,
            // icon: 'folder',

            // tags: [],
            // root_registration_signature: '',
            // mirrors: [],
            // created_at: 2024-10-21T16:38:51.901466,
            // primary_website: '',
            // hide_folders: [],
            // uuid: 'baf39baa-335c-4af7-bd08-5737ff567dc5',
            // updated_at: '2024-10-21T16:51:46.878912',
            // indexing_enabled: true,
            // owner_shortname: dmart,
            // capture_misses: false,
            // active_plugins: [
            //   action_log,
            //   redis_db_update,
            //   resource_folders_creation
            // ],
            // check_health: false,
            is_active: true,
            // languages: [
            //   english,
            //   arabic
            // ],
            displayname: {
              en: resource.displayname,
              ar: resource.displayname
            },
            description: {
              en: resource.description,
              ar: resource.description
            },
            relationships: [],
          }
        }
      ]
    };
  }
  // prepare to PUT
  static PrepSave(resource: IResource): any {

    return {
      id: resource.id
    };

  }

}
