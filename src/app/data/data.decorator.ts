import { Observable, of, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { ICachedStorage } from './cachedstorage.model';
import { debug } from '../utils/rxjs.operators';

export interface IStorageService {
   storageService: StorageService;
}
export function DataCache<T extends IStorageService>(options?: Partial<ICachedStorage & { withArgs: boolean }>) {
   return function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value; // save a reference to the original method

      // NOTE: Do not use arrow syntax here. Use a function expression in
      // order to use the correct value of `this` in this method (see notes below)
      // here, find element in cache, and return it if found

      const cacheKey = options?.key || `${target.constructor.name}.${propertyKey}`;

      descriptor.value = function (...args: any[]): Observable<any> {

         // append arguments if key is not passed
         const key = options?.withArgs ? `${cacheKey}_${JSON.stringify(args)}` : cacheKey;
         const _data: any = this.storageService.getCache(key);
         if (_data) {
            // if localStroage exist, return
            return of(_data).pipe(debug('Cached ' + key));
         } else {

            return originalMethod.apply(this, args).pipe(
               tap(response => {
                  this.storageService.setCache(key, response, options?.expiresin);
               })
            );
         }
      };

      return descriptor;
   };
}
