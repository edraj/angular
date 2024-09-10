import { Observable, finalize, of, switchMap, tap, timer } from 'rxjs';
import { Config } from '../config';
import { debug } from '../utils/rxjs.operators';
import { StorageService } from './storage.service';
export interface IStorageService {
  storageService: StorageService;
}

interface ICached {
  key: string;
  withArgs: boolean;
  expiresin: number;
}

const locks: { [key: string]: boolean } = {};

export function DataCache<T extends IStorageService>(options?: Partial<ICached>) {
  return function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value; // save a reference to the original method

    // NOTE: Do not use arrow syntax here. Use a function expression in
    // order to use the correct value of `this` in this method (see notes below)
    // here, find element in cache, and return it if found


    const cacheKey = options?.key || `${target.constructor.name}.${propertyKey}`;

    descriptor.value = function (...args: any[]): Observable<any> {

      const key = options?.withArgs ? `${cacheKey}_${JSON.stringify(args)}` : cacheKey;

      const _data: any = this.storageService.getItem(key);
      if (_data) {
        // if localStroage exist, return
        return of(_data).pipe(debug('Cached ' + cacheKey));
      }

      const fireOff = () => {
        const _data: any = this.storageService.getItem(key);
        // append arguments if key is not passed
        if (_data) {
          // if localStroage exist, return
          return of(_data).pipe(debug('Cached ' + cacheKey));
        } else {
          locks[cacheKey] = true;
          return originalMethod.apply(this, args).pipe(
            tap((response: any) => {
              this.storageService.setItem(key, response, options?.expiresin);
            }),
            finalize(() => {
              delete locks[cacheKey];
            })
          );
        }
      };

      return locks[cacheKey] ? timer(Config.Basic.lockTimeout).pipe(switchMap(fireOff)) : fireOff();

    };

    return descriptor;
  };
}
