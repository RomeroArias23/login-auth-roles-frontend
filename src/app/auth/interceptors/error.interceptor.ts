/**
 * Global HTTP error interceptor
 *
 * This interceptor is responsible for handling
 * authentication and authorization errors
 * returned by the backend API.
 *
 * Its main purpose is to:
 * - detect expired or invalid JWT tokens
 * - automatically log the user out
 * - redirect the user to the login screen
 *
 * This creates a consistent and secure
 * session-handling mechanism across the application.
 */

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * Functional HTTP interceptor (Angular 16+).
 *
 * Intercepts every HTTP response coming from HttpClient.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  /**
   * Inject required services manually.
   *
   * Functional interceptors do not support constructor injection,
   * so Angular's inject() function is used instead.
   */
  const auth = inject(AuthService);
  const router = inject(Router);

  /**
   * Forward the request and handle potential errors.
   */
  return next(req).pipe(

    /**
     * Catch HTTP errors globally.
     */
    catchError(err => {

      /**
       * 401 Unauthorized:
       * - user is not authenticated
       * - token is missing or invalid
       *
       * 403 Forbidden:
       * - token is valid
       * - user does not have required role
       */
      if (err.status === 401 || err.status === 403) {

        /**
         * Clear local authentication state.
         * This removes JWT token and user data.
         */
        auth.logout();

        /**
         * Redirect user back to login page.
         */
        router.navigate(['/login']);
      }

      /**
       * Re-throw the error so that
       * calling components may handle it if needed.
       */
      return throwError(() => err);
    })
  );
};