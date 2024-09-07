import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DmartInterceptor } from './http';
import { ConfigService } from './services';
import { LocalInterceptor } from './local.interceptor';
import { DmartErrorHandler } from './error.service';



// services singletons here
@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [Title,

        {
            provide: APP_INITIALIZER,
            useFactory: ConfigService.configFactory,
            multi: true,
            deps: [ConfigService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LocalInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DmartInterceptor,
            multi: true,
        },
        { provide: ErrorHandler, useClass: DmartErrorHandler }]
})
export class CoreModule {

}
