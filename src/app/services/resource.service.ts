import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../config';
import { IList, IListOptions, ListOptions } from '../models/list.model';
import { IResource, Resource } from '../models/resource.model';
import { GetParamsAsString } from '../utils/common';


@Injectable({ providedIn: 'root' })
export class ResourceService {


  constructor(private _http: HttpClient) {

  }


  GetResources(options: IListOptions = {}): Observable<IList<IResource>> {

    const params = ListOptions.MapQueryListOptions(options);

    // query finds resouces in folders only, need to filter for specific resource to get single resource
    return this._http.post(Config.API.resource.query, params).pipe(
      map(response => {
        return Resource.NewList(<any>response, options);
      })
    );
  }


  GetEntry(options: IListOptions = {}): Observable<IResource> {
    const params = GetParamsAsString(ListOptions.MapEntryListOptions({withPayload: true, ...options}));

    const _url = ListOptions.MapResourceUrlListOptions(Config.API.resource.details, options)
      .replace(':options', params);

    // /managed/entry/:resource/:space/:subpath/:shortname
    return this._http.get(_url).pipe(
      map(response => {
        // returned resource does not have space and subpath, pass them to map them
        return Resource.NewInstance(<any>response, options);
      })
    );
  }

  CreateResource(resource: IResource): Observable<IResource> {
    const data = Resource.PrepCreate(resource);

    return this._http.post(Config.API.resource.create, data).pipe(
      map(response => {
        return Resource.NewInstance(<any>response);
      })
    );
  }

  SaveResource(resource: IResource): Observable<IResource> {
    const _url = Config.API.resource.save.replace(':id', resource.id);
    const data = Resource.PrepSave(resource);

    return this._http.put(_url, data).pipe(
      map(response => {
        return resource;
      })
    );
  }

  DeleteResource(resource: IResource): Observable<boolean> {
    const _url = Config.API.resource.delete.replace(':id', resource.id);

    return this._http.delete(_url).pipe(
      map(response => {
        return true;
      })
    );
  }

}
