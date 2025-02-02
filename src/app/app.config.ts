import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';

import { AppRouteProviders } from './app.routes';
import { CoreProviders } from './utils/core.providers';
import { LocaleId } from './utils/resources';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useClass: LocaleId },
    provideZoneChangeDetection({ eventCoalescing: true }),
    ...CoreProviders,
    ...AppRouteProviders,
  ]
};
