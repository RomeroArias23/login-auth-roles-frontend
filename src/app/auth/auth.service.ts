import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

// Interface representing the authentication response
// returned by the backend after a successful login
export interface LoginResponse {
  id: number;
  username: string;
  role: string;
  token: string; // JWT token used for authenticated requests
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  // Base URL for authentication-related endpoints
  private api = 'http://localhost:3000/auth';

  // HttpClient is used to communicate with the backend API
  constructor(private http: HttpClient) {}

  /**
   * Sends login credentials to the backend.
   * If authentication is successful:
   * - receives a JWT token
   * - stores token and user data in localStorage
   */
  login(username: string, password: string) {
    return this.http.post<LoginResponse>(
      `${this.api}/login`,
      { username, password }
    ).pipe(
      tap(res => {
        // Persist authentication token
        localStorage.setItem('token', res.token);

        // Store user information (id, username, role)
        localStorage.setItem('user', JSON.stringify(res));
      })
    );
  }

  /**
   * Logs out the user by removing authentication data
   * from the browser storage.
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Clears the entire session.
   * Useful when token expires or backend returns 401.
   */
  clearSession() {
    localStorage.clear();
  }

  /**
   * Returns the stored JWT token.
   * Used mainly by HTTP interceptors.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Retrieves the logged-in user from localStorage.
   */
  getUser() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  /**
   * Determines whether the user is authenticated.
   * Returns true if a valid token exists.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}