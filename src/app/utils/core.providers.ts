import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { configFactory, ConfigService } from './config.service';
import { DmartErrorHandler } from './error.service';
import { DmartInterceptorFn } from './http.fn';
import { LocalInterceptorFn } from './local.fn';

// if standalone providers use this instead of core.module.ts

export const CoreProviders = [
   provideHttpClient(
      // do this, to keep using your class-based interceptors.
      withInterceptors([
         LocalInterceptorFn,
         DmartInterceptorFn
      ])
   ),
   {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      multi: true,
      deps: [ConfigService]
   },
   { provide: ErrorHandler, useClass: DmartErrorHandler }
];
