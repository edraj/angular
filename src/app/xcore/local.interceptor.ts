import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


@Injectable()
export class LocalInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('localdata') < 0) {
            return next.handle(req);
        }

        let url = req.url;

        const adjustedReq = req.clone({ url: url });
        return next
            .handle(adjustedReq)
            .catchProjectError(req.urlWithParams, req.method)
            .debug(req.urlWithParams, req.method, 'p');
    }
}
