import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';
import { tokenInterceptor } from './app/interceptors/token.interceptor.fn';
import { errorInterceptor } from './app/auth/interceptors/error.interceptor';

/**
 * Application bootstrap entry point.
 *
 * Uses Angular standalone configuration
 * instead of traditional NgModules.
 */
bootstrapApplication(AppComponent, {

  // Global application providers
  providers: [

    /**
     * Registers application routes.
     * Enables Angular Router throughout the app.
     */
    provideRouter(routes),

    /**
     * Registers HttpClient with global interceptors.
     *
     * Interceptors applied in order:
     * 1. tokenInterceptor  → attaches JWT token
     * 2. errorInterceptor  → handles HTTP errors (401, 403, etc.)
     */
    provideHttpClient(
      withInterceptors([
        tokenInterceptor,
        errorInterceptor
      ])
    )
  ]

// Logs any bootstrap errors during application startup
}).catch(err => console.error(err));