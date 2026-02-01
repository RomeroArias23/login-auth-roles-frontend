import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',

  // Standalone component (no NgModule required)
  standalone: true,

  // Common Angular directives (ngIf, ngFor, etc.)
  imports: [CommonModule],

  // Component template
  templateUrl: './navbar.component.html',

  // Component styles
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  // Inject AuthService for authentication handling
  // Inject Router for navigation control
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  /**
   * Logs the user out of the application.
   * - Clears authentication data from storage
   * - Redirects user to the login screen
   */
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
