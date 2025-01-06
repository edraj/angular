import { HttpContext, HttpContextToken, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, shareReplay } from 'rxjs';
import { AuthState } from '../auth/auth.state';
import { LoaderState } from '../lib/loader/loader.state';
import { ConfigService } from './config.service';
import { Res } from './resources';
import { catchAppError, debug } from './rxjs.operators';

// if standalone use this instead of http.ts

// create a context token

const LOADING_SOURCE = new HttpContextToken<string>(() => '');

export const applyContext = (src: string) => {
   return { context: new HttpContext().set(LOADING_SOURCE, src) };
};


const getHeaders = (): any => {
   //  authorization here
   const authState = inject(AuthState);

   let headers: any = {};
   const _auth = authState.GetToken();

   if (_auth && _auth !== '') {
     headers['Authorization'] = `Bearer ${_auth}`;
   };
   headers['Accept-Language'] = Res.language;


   return headers;
};



export const DmartInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

   const loaderService = inject(LoaderState);

   if (req.url.indexOf('localdata') > -1) {
      // pass through
      return next(req);
   }
   const url = ConfigService.Config.API.apiRoot + req.url;

   const adjustedReq = req.clone({ url: url, setHeaders: getHeaders()});
   loaderService.show(req.context.get(LOADING_SOURCE));

   if (req.body) {
      _debug(req.body, `Request ${req.method} ${req.urlWithParams}`, 'p');
   }

   return next(adjustedReq)
      .pipe(
         shareReplay(),
        //  map(response => mapData(response)),
         finalize(() => {
            loaderService.hide(req.context.get(LOADING_SOURCE));
         }),
         debug(`${req.method} ${req.urlWithParams}`, 'p'),
         catchAppError(`${req.method} ${req.urlWithParams}`)
      );
};
