import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

import { DashboardUserComponent } from './components/user/dashboard-user/dashboard-user.component';
import { DashboardAdvisorComponent } from './components/advisor/dashboard-advisor/dashboard-advisor.component';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';

/**
 * Application route configuration.
 *
 * Routing strategy:
 * - Public routes: login
 * - Protected routes: user, advisor, admin
 * - Authorization handled via guards
 */
export const routes: Routes = [

  /* ----------------------------------------
     Default route
     ---------------------------------------- */

  // Redirect root URL to login page
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public login route (no authentication required)
  { path: 'login', component: LoginComponent },

  /* ----------------------------------------
     Protected routes
     ---------------------------------------- */

  {
    // User dashboard route
    path: 'user',
    component: DashboardUserComponent,

    // Guards executed before route activation
    canActivate: [AuthGuard, RoleGuard],

    // Roles allowed to access this route
    data: { roles: ['user'] }
  },

  {
    // Advisor dashboard route
    path: 'advisor',
    component: DashboardAdvisorComponent,

    // Requires authentication and advisor role
    canActivate: [AuthGuard, RoleGuard],

    // Authorized roles for this route
    data: { roles: ['advisor'] }
  },

  {
    // Admin dashboard route
    path: 'admin',
    component: DashboardAdminComponent,

    // Highest level of access protection
    canActivate: [AuthGuard, RoleGuard],

    // Only admins may access this route
    data: { roles: ['admin'] }
  },

  /* ----------------------------------------
     Fallback route
     ---------------------------------------- */

  // Redirect unknown routes to login
  { path: '**', redirectTo: 'login' }
];