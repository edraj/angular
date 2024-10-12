import { Config } from '../config';
import { makeDate } from '../utils/common';
import { DataList, IList } from './list.model';
import { Translation } from './translation.model';

export enum EnumResourceType {
  USER = 'user',
  GROUP = 'group',
  FOLDER = 'folder',
  SCHEMA = 'schema',
  CONTENT = 'content',
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
  contentType?: string;
  type?: EnumResourceType;
  schema?: string;
  subpath?: string;
  contentPath?: string;
  shortname?: string;
  displayname?: string;
}


export class Resource {

  static NewInstance(resource: any): IResource {
    // usually the crust is attributes, but there are important information on root, keep it for now
    if (!resource) return null;

    // in entry, subpath is undefined, but its not used anyway
    const _nullroot = !resource.subpath || resource.subpath === '/';
    const _subpath = _nullroot ? '/' : `/${resource.subpath}/`; // normalize
    const _contentpath = _nullroot ? Config.API.rootPath : resource.subpath;
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
      subpath: _subpath + resource.shortname,
      contentPath: `${_contentpath}/${resource.shortname}`
    };
  }
  static NewInstances(resources: any[]): IResource[] {
    return resources.map(Resource.NewInstance);
  }
  static NewList(dataset: any): IList<IResource> {
    const dl = new DataList<IResource>();
    dl.mapper = (item: any) => Resource.NewInstance({ ...item, ...item?.attributes });
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
