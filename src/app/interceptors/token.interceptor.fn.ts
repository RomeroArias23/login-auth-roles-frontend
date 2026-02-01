import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

/**
 * HTTP interceptor responsible for attaching
 * the JWT token to outgoing API requests.
 *
 * Uses Angular functional interceptor syntax
 * (introduced in Angular 15+).
 */
export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {

  // Inject AuthService inside functional interceptor
  const authService = inject(AuthService);

  // Retrieve JWT token from local storage
  const token = authService.getToken();

  // If token exists, clone request and add Authorization header
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Forward modified request
    return next(cloned);
  }

  // If no token exists, send request without modification
  return next(req);
};