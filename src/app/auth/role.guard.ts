import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  // Inject AuthService to access the logged-in user
  // Inject Router to redirect unauthorized users
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  /**
   * Determines whether the route can be activated
   * based on the user's role.
   *
   * Roles allowed for the route are defined in
   * the routing configuration:
   *
   * data: { roles: ['admin', 'manager'] }
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {

    // Roles permitted to access the current route
    const allowedRoles = route.data['roles'];

    // Retrieve current logged-in user from AuthService
    const user = this.auth.getUser();

    // If user is not logged in or role is not authorized
    if (!user || !allowedRoles.includes(user.role)) {

      // Redirect to login or access-denied page
      this.router.navigate(['/login']);

      // Block route activation
      return false;
    }

    // User role is authorized — allow access
    return true;
  }
}