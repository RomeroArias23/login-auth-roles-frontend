import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  // Inject AuthService to check authentication status
  // Inject Router to redirect unauthenticated users
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  // This method runs before a route is activated
  canActivate(): boolean {

    // If the user is logged in, allow access to the route
    if (this.auth.isLoggedIn()) {
      return true;
    }

    // If the user is not logged in, redirect to login page
    this.router.navigate(['/login']);

    // Block access to the requested route
    return false;
  }
}
