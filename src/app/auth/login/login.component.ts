/**
 * LoginComponent
 *
 * This component handles user authentication from the frontend.
 *
 * Responsibilities:
 * - render the login form
 * - validate user input
 * - submit credentials to the backend API
 * - store authentication state via AuthService
 * - redirect users based on their authorization role
 *
 * This component works together with:
 * - AuthService (API communication)
 * - JWT interceptor (token attachment)
 * - Role guards (route protection)
 */

import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',

  /**
   * Standalone component (Angular 15+).
   * No NgModule required.
   */
  standalone: true,

  /**
   * Required modules for template functionality.
   */
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  /**
   * Reactive login form.
   *
   * Using Reactive Forms allows:
   * - strong typing
   * - synchronous validation
   * - better scalability for enterprise apps
   */
  form!: ReturnType<FormBuilder['group']>;

  /**
   * UI state flags.
   */
  loading = false;
  error = '';

  /**
   * Constructor dependency injection.
   *
   * @param fb - builds reactive form controls
   * @param auth - handles authentication API calls
   * @param router - navigates user after successful login
   */
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

    /**
     * Initialize login form.
     *
     * Both fields are required.
     * Additional validators could easily be added here.
     */
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Triggered when the login form is submitted.
   *
   * Flow:
   * 1. Validate form input
   * 2. Send credentials to backend
   * 3. Receive JWT token and user role
   * 4. Redirect user based on role
   */
  login() {

    console.log('SUBMIT LOGIN');

    /**
     * Prevent API call if form is invalid.
     */
    if (this.form.invalid) {
      console.log('FORM INVALID');
      return;
    }

    /**
     * Extract credentials from form.
     */
    const { username, password } = this.form.value;

    console.log('SENDING LOGIN:', username);

    /**
     * Call authentication service.
     *
     * Backend endpoint:
     * POST /auth/login
     */
    this.auth.login(username!, password!).subscribe({

      /**
       * Successful authentication.
       *
       * Backend response contains:
       * - user id
       * - username
       * - role
       * - JWT token
       */
      next: (res) => {

        console.log('LOGIN RESPONSE:', res);

        /**
         * Role-based routing.
         *
         * Each role has its own protected dashboard.
         */
        if (res.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (res.role === 'advisor') {
          this.router.navigate(['/advisor']);
        } else {
          this.router.navigate(['/user']);
        }
      },

      /**
       * Authentication failure.
       *
       * Errors may include:
       * - invalid credentials
       * - expired token
       * - backend unavailable
       */
      error: (err) => {
        console.error('LOGIN ERROR:', err);
        this.error = 'Invalid username or password';
      }
    });
  }
}
