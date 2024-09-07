import { Observable } from 'rxjs';
import { finalize, shareReplay, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpHeaders,
    HttpContextToken,
    HttpContext
} from '@angular/common/http';
import { catchAppError, debug } from './rxjs.operators';
import { ConfigService } from '../utils/config.service';
import { LoaderState } from '../lib/loader/loader.state';

// create a context token
const LOADING_SOURCE = new HttpContextToken<string>(() => '');


export const applyContext = (src: string) => {
   return { context: new HttpContext().set(LOADING_SOURCE, src) };
 };

@Injectable()
export class DmartInterceptor implements HttpInterceptor {
    private isRefreshingToken = false;
    // tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private loaderService: LoaderState) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('localdata') > -1) {
            // pass through
            return next.handle(req);
        }
        const url = ConfigService.Config.API.apiRoot + req.url;


        const adjustedReq = req.clone({ url: url, setHeaders: this.getHeaders(req.headers) });
        this.loaderService.show(req.context.get(LOADING_SOURCE));

        if (req.body) {
            _debug(req.body, `Request ${req.method} ${req.urlWithParams}`, 'p');
        }

        return next
            .handle(adjustedReq)
            .pipe(
                shareReplay(),
                map(response => this.mapData(response)),
                finalize(() => {
                    this.loaderService.hide(req.context.get(LOADING_SOURCE));
                }),
                debug(`${req.method} ${req.urlWithParams}`, 'p'),
                catchAppError(`${req.method} ${req.urlWithParams}`)
            );

        // do catch 401 here
    }

    private getHeaders(reqheaders: HttpHeaders): any {
        //  authorization here
        let headers: any = {};


        return headers;
    }

    // if response wrapped with "data"
    private mapData(response: any) {
        if (response instanceof HttpResponse) {

            // clone body and modify so that "data" is removed as a wrapper
            if (response.body && response.body.data) {
                response = response.clone({ body: response.body.data });
            }
        }
        return response;
    }

}
