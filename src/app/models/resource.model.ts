import { makeDate } from '../utils/common';
import { Res } from '../utils/resources';
import { DataList, IList } from './list.model';
import { ITranslation } from './translation.model';

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
  shortname?: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
  tags?: string[];
  displayname?: string;
  description?: string;
  body?: any;
  contentType?: string;
  type?: EnumResourceType;
  schema?: string;
  subpath?: string;
}


export class Resource {
  private static mapLanguage(prop: ITranslation): string {
    return prop ? prop[Res.language] : '';
  }

  static NewInstance(resource: any): IResource {
    // usually the crust is attributes, but there are important information on root, keep it for now
    return {
      id: resource.uuid,
      shortname: resource.shortname,
      type: resource.resource_type,
      schema: resource.schema_shortname,
      created: makeDate(resource.created_at),
      updated: makeDate(resource.updated_at),
      isActive: resource.is_active,
      tags: resource.tags,
      displayname: Resource.mapLanguage(resource.displayname) || resource.shortname, // calculate per language
      description: Resource.mapLanguage(resource.description),
      body: resource.payload?.body,
      contentType: resource.payload?.content_type,
      subpath: resource.subpath === '/' ? `/${resource.shortname}` : `/${resource.subpath}/${resource.shortname}`, // normalize to /pa/th/shortname

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
