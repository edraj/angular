import { inject } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../config';
import { AuthState } from './auth.state';

const secure = (redirect: string): Observable<boolean> => {

   const authState = inject(AuthState);
   const router = inject(Router);
   authState.redirectUrl = redirect;


   return authState.stateItem$.pipe(
      map(user => {
         // if user exists let them in, else redirect to login
         if (!user) {
            router.navigateByUrl(Config.Auth.loginRoute);
            return false;
         }
         // user exists
         return true;
      })
   );


};

export const AuthCanActivate: CanActivateFn = (_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
   return secure(state.url);
};

export const AuthCanActivateChild: CanActivateChildFn = (_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

   return secure(state.url);
};

export const AuthCanMatch: CanMatchFn = (_: Route, segments: UrlSegment[]): Observable<boolean> => {
   const fullPath = segments.reduce((path, currentSegment) => {
      return `${path}/${currentSegment.path}`;
   }, '');

   return secure(fullPath);
};
