import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from './environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideAuth0({
      domain: environment.auth0.auth0Domain,
      clientId: environment.auth0.auth0ClientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        scope: 'openid profile email',
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
    }),
  ]
};
appConfig.providers.push(provideHttpClient());