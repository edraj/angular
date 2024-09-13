import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../config';
import { GetParamsAsString } from '../utils/common';
import { IList, IListOptions, ListOptions } from './list.model';
import { ISpace, Space, } from './space.model';


@Injectable({ providedIn: 'root' })
export class SpaceService {

  private _listUrl = Config.API.space.list;
  private _detailsUrl = Config.API.space.details;
  private _createUrl = Config.API.space.create;
  private _saveUrl = Config.API.space.save;
  private _deleteUrl = Config.API.space.delete;

  constructor(private _http: HttpClient) {

  }

  GetSpaces(options: IListOptions = {}): Observable<IList<ISpace>> {
    const params = GetParamsAsString(ListOptions.MapSearchListOptions(options));
    const _url = this._listUrl.replace(':options', params);

    return this._http.get(_url).pipe(
      map(response => {
        return Space.NewList(<any>response);
      })
    );
  }

  RealGetSpaces(options: IListOptions = {}): Observable<IList<ISpace>> {
    const params = ListOptions.MapSearchListOptions(options);

    return this._http.post(this._listUrl, params).pipe(
      map(response => {
        return Space.NewList(<any>response);
      })
    );
  }


  GetSpace(id: string): Observable<ISpace> {
    const _url = this._detailsUrl.replace(':id', id);
    return this._http.get(_url).pipe(
      map(response => {
        return Space.NewInstance(response);
      })
    );

  }

  CreateSpace(space: ISpace): Observable<ISpace> {
    const _url = this._createUrl;
    const data = Space.PrepCreate(space);
    _debug(data, 'CreateSpace data');

    return this._http.post(_url, data).pipe(
      map(response => {
        return Space.NewInstance(<any>response);
      })
    );
  }

  SaveSpace(space: ISpace): Observable<ISpace> {
    const _url = this._saveUrl.replace(':id', space.id);
    const data = Space.PrepSave(space);
    _debug(data, 'SaveSpace data');

    return this._http.put(_url, data).pipe(
      map(_ => {
        return space;
      })
    );
  }

  DeleteSpace(space: ISpace): Observable<boolean> {
    const _url = this._deleteUrl.replace(':id', space.id);

    return this._http.delete(_url).pipe(
      map(_ => {
        return true;
      })
    );
  }

}
