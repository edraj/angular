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
    const params = GetParamsAsString(ListOptions.MapEntryListOptions({ withPayload: true, ...options }));

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


  CreateResource(resource: Partial<IResource>, valvet: boolean = false): Observable<IResource> {
    const data = Resource.PrepCreate(resource);

    // valvet is supposed to go away once the resource create can be used to create space
    if (valvet) {
      return this._http.post(Config.API.space.create, data).pipe(
        map((response: any) => {
          return { ...resource, ...Resource.NewInstanceFromResponse(response) };
        })
      );
    }
    return this._http.post(Config.API.resource.create, data).pipe(
      map((response: any) => {
        // same resource with uuid, but better use resource as is
        return { ...resource, ...Resource.NewInstanceFromResponse(response, {space: resource.space}) };
      })
    );
  }

  SaveResource(resource: Partial<IResource>): Observable<IResource> {
    const data = Resource.PrepSave(resource);
    return this._http.post(Config.API.resource.delete, data).pipe(
      map((response: any) => {
        return { ...resource, ...Resource.NewInstanceFromResponse(response, {space: resource.space}) };
      })
    );
  }

  DeleteResource(resource: IResource): Observable<boolean> {
    const data = Resource.PrepDelete(resource);
    return this._http.post(Config.API.resource.delete, data).pipe(
      map((response: any) => {
        // same resource with uuid, but better use resource as is
        return true;
      })
    );


  }

}
