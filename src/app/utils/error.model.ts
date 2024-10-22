import { HttpErrorResponse } from '@angular/common/http';

export interface IUiError {
    code: string;
    message?: string;
    internalMessage?: string;
    status?: number;
    uiMessage?: string;
}
/*
  "error": {
    "type": "string",
    "code": 0,
    "message": "string",
    "info": [
      {}
    ]
  },*/

export const UiError = (error: any): IUiError => {
    let e: IUiError = {
        code: 'Unknown',
        message: error,
        status: 0
    };

    if (error instanceof HttpErrorResponse) {
        // map general error
        e.message = error.message || '';
        e.status = error.status || 0;

        // dig out the message if found
        if (error.error?.error) {
            // accumelate all errors
            const _error = error.error.error;
            e.message =_error.message || '';
            e.code = _error.code || 'Unknown';
            // info, and type, TODO
        }
    }
    return e;
};
