import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { AppRouteProviders } from './app.routes';
import { CoreProviders } from './utils/core.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    ...CoreProviders,
    ...AppRouteProviders,
  ]
};
