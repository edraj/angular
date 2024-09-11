import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Config } from '../config';
import { AuthState } from './auth.state';

export const LoginResolveFn: ResolveFn<boolean> = (): Observable<boolean> => {

   const authState = inject(AuthState);
   const router = inject(Router);
   return authState.stateItem$.pipe(
      map(user => {
         if (user) {
            router.navigateByUrl(authState.redirectUrl || Config.Basic.defaultRoute);

         }
         // does not really matter, I either go in or navigate away
         return true;
      })
   );

};
