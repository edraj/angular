
export interface IListItem {
    id: string;
}

export interface IList<T extends IListItem> {
    matches: T[]; // records
    total: number; // attributes.total
}



export interface IListOptions {
    page?: number;
    keyword?: string;
    country?: string;
    size?: number;
    total?: number;
    hasMore?: boolean;

}


export class ListOptions {
    public static MapSearchListOptions(_: any): any {
        // map each to its name in db, watch out for arrays
        return {
          type: 'spaces',
          space_name: 'management',
          subpath: '/',
          search: '',
          limit: 100
      }

        // return {

        //     k: options.keyword,
        //     c: options.country,
        //     p: options.page || 1,
        //     s: options.size || Config.Basic.defaultSize
        // };

    }

}

export class DataList<T extends IListItem>  {
    public mapper?: (dataitem: any) => T;



    public NewDataList(dataset: any): IList<T> {
        return {
            total: dataset.attribues?.total,
            matches: dataset.records?.map(this.mapper)
        };
    }
}
