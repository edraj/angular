
// export interface IApiResponseRecord {
//   resource_type: string;
//   shortname: string;
//   subpath: string;
//   attributes: any;
//   uuid?: string;
// };

// export interface IApiResponse {
//   status: 'success' | 'failed';
//   error?: {
//     code: string;
//     info?: string;
//     message: string;
//     type: string;
//   };
//   records: IApiResponseRecord[];
//   attributes: any;
// };

export class ApiResponse {
  static NewInstance(data: any): any {
    // any looks like that, extract records for single instance
    let _data = data.records?.length ? data.records[0] : null;
    if (_data) {
      _data = _data.attributes;
    }

    return _data;
    // return {
    //   status: data.status,
    //   error: data.error,
    //   data: _data,
    //   attributes: data.attributes
    // };
  }

  static NewListInstance(data: any): any {
    let _records = data.records || null;


    return {
      status: data.status,
      error: data.error,
      data: _records?.map((n: any) => n.attributes),
      attributes: data.attributes
    };
  }
}
