import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IData, TypeDataType } from './data.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private _http: HttpClient,
    public storageService: StorageService
  ) {}

  GetSingleDataByKey(
    type: TypeDataType,
    key: string
  ): Observable<IData | undefined> {
    if (key === null) {
      return of(undefined);
    }

    const getFunction = (<any>this)['Get' + type];
    if (!getFunction) {
      return of(undefined);
    }
    return getFunction
      .call(this)
      .pipe(map((data: IData[]) => data.find((n) => n.key === key)));
  }
}
