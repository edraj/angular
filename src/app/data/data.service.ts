import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Config } from '../utils/config';
import { debug } from '../utils/rxjs.operators';
import { DataClass, EnumDataType, IData } from './data.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private cacheUrls = new Map<EnumDataType, { url: string, expiresin?: number; }>();

    constructor(private _http: HttpClient, private storageService: StorageService) {
        // instantiate
        this.cacheUrls.set(EnumDataType.NotDefined, { url: Config.API.data.notdefined, expiresin: 3 });

    }
    GetData(type: EnumDataType, id: string = '0'): Observable<IData[]> {
        // for typing purposes only
        return <Observable<IData[]>>this.GetCache(type, id);

    }
    private GetCache(type: EnumDataType, id: string = '0'): Observable<any> {

        const name: string = EnumDataType[type];
        // replace id

        const _cachedUrl = this.cacheUrls.get(type);
        const _url = _cachedUrl?.url.replace(':id', id);
        const _data: any = this.storageService.getCache(`${name}.${id}`);
        // localdata is guarranteed to be within expiration date this way
        if (_data) {

            // if localStroage exist, return
            return of(_data).pipe(debug('Cached GetData ' + name));
        } else {
            // get from server, url is replaced for the correct id
            return this._http
                .get(_url)
                .pipe(
                    map((response: any) => {
                        const _retdata = DataClass.NewInstances(<any>response);

                        // assgin to localstorage with key and expires in hours if set
                        this.storageService.setCache(`${name}.${id}`, _retdata, _cachedUrl?.expiresin);

                        return _retdata;
                    })
                );
        }
    }

    // Example GetCategories(): Observable<IData[]> {
    //     return this.GetData(EnumDataType.Category);
    // }

    GetSingleDataById(type: EnumDataType, id: string): Observable<IData | undefined> | null {
        if (id === null) {
            return null;
        }

        return this.GetData(type).pipe(
            map(data => data.find(n => n.id?.toString() === id.toString())));
    }

    GetSingleDataByKey(type: EnumDataType, key: string): Observable<IData | undefined> {
        // WATCH: observable of null
        if (key === null) {
            return of(undefined);
        }

        return this.GetData(type).pipe(
            map(data => data.find(n => n.key === key)));
    }

}
