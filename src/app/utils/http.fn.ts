import { HttpContext, HttpContextToken, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, map, shareReplay } from 'rxjs';
import { LoaderState } from '../lib/loader/loader.state';
import { ConfigService } from './config.service';
import { catchAppError, debug } from './rxjs.operators';

// if standalone use this instead of http.ts

// create a context token

const LOADING_SOURCE = new HttpContextToken<string>(() => '');

export const applyContext = (src: string) => {
   return { context: new HttpContext().set(LOADING_SOURCE, src) };
};


const getHeaders = (reqheaders: HttpHeaders): any => {
   //  authorization here
   let headers: any = {...reqheaders};


   return headers;
};

// if response wrapped with "data"
const mapData = (response: any) => {
   if (response instanceof HttpResponse) {

      // clone body and modify so that "data" is removed as a wrapper
      if (response.body && response.body.data) {
         response = response.clone({ body: response.body.data });
      }
   }
   return response;
};

export const DmartInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

   const loaderService = inject(LoaderState);

   if (req.url.indexOf('localdata') > -1 || req.url.indexOf('http') > -1) {
      // pass through
      return next(req);
   }
   const url = ConfigService.Config.API.apiRoot + req.url;


   const adjustedReq = req.clone({ url: url, setHeaders: getHeaders(req.headers)});
   loaderService.show(req.context.get(LOADING_SOURCE));

   if (req.body) {
      _debug(req.body, `Request ${req.method} ${req.urlWithParams}`, 'p');
   }

   return next(adjustedReq)
      .pipe(
         shareReplay(),
         map(response => mapData(response)),
         finalize(() => {
            loaderService.hide(req.context.get(LOADING_SOURCE));
         }),
         debug(`${req.method} ${req.urlWithParams}`, 'p'),
         catchAppError(`${req.method} ${req.urlWithParams}`)
      );
};
