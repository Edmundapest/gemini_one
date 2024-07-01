import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideOAuthClient } from 'angular-oauth2-oidc'
import { provideHttpClient } from '@angular/common/http'

import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideOAuthClient(),
    provideHttpClient(),
    provideAnimationsAsync(),
  ],
}
