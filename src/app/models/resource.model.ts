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
    // accoring to options type append shortname or not
    const _extra = options?.resourceType && options.resourceType !== EnumResourceType.FOLDER ? '' : `/${resource.shortname}`;

    // if subpath is null, adjust it to root
    // clean double '//' this is a patch because im tired
    const _path =  (options.subpath ? `/${options?.subpath}`: '').replace('//', '/');

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
      subpath: `${_path}${_extra}`,
      space: options?.space,
      path: `${options?.space}/${resource.resource_type}${_path}${_extra}`,
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


  // prepare to POST
  static PrepCreate(resource: IResource): any {
    return {
      id: resource.id
    };
  }
  // prepare to PUT
  static PrepSave(resource: IResource): any {

    return {
      id: resource.id
    };

  }

}
