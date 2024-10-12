import { Config } from '../config';
import { EnumResourceType } from './resource.model';

export interface IListItem {
  id: string;
}

export interface IList<T extends IListItem> {
  matches: T[]; // records
  total: number; // attributes.total
}


export enum EnumQueryType {
  AGGREGATION = 'aggregation',
  SEARCH = 'search',
  SUBPATH = 'subpath',
  EVENTS = 'events',
  HISTORY = 'history',
  TAGS = 'tags',
  SPACES = 'spaces',
  COUNTERS = 'counters',
  REPORTS = 'reports',
  RANDOM = 'random',
}

export interface IListOptions {
  page?: number;
  keyword?: string;
  size?: number;
  total?: number;
  sort?: { by: string, order: string; }; // TODO:
  hasMore?: boolean;
  type?: EnumQueryType;
  withPayload?: boolean;
  withAttachments?: boolean;
  resource?: EnumResourceType;
  space?: string;
  subpath?: string;

}



export class ListOptions {

  // make a search query
  static MapQueryListOptions(options: IListOptions): any {
    // map each to its name in db, watch out for arrays

    return {
      type: options.type || EnumQueryType.SEARCH,
      space_name: options.space || Config.API.rootSpace,
      subpath: options.subpath || '/',
      search: options.keyword || '',
      limit: options.size || 100,
      exact_subpath: true, // almost always true
      // TODO:
      sort_type: 'descending',
      sort_by: 'resource_type',
      filter_types: [EnumResourceType.CONTENT, EnumResourceType.FOLDER]
    };

  }

  static MapEntryListOptions(options: IListOptions): any {
    return {
      retrieve_json_payload: options.withPayload || false,
      retrieve_attachments: options.withAttachments || false,
      validate_schema: true,
      // filter_attachments_types
    };
  }

  static MapResourceUrlListOptions(url: string, options: IListOptions): string {

    return url
      .replace(':resource', options.resource || EnumResourceType.CONTENT)
      .replace(':space', options.space)
      // bummer, __root__ is used for subpath here, not space
      .replace(':subpath', options.subpath);
  }




}

export class DataList<T extends IListItem> {
  public mapper?: (dataitem: any) => T;



  public NewDataList(dataset: any): IList<T> {
    return {
      total: dataset.attributes?.total,
      // this is not good enough, the records also have attributes
      matches: dataset.records?.map(this.mapper)
    };
  }
}
