import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class DmartErrorHandler implements ErrorHandler {

    handleError(error: any) {
        _debug(error, 'Unhandled Error', 'e');

    }
}
