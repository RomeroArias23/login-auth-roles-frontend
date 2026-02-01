import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Standard API response interface.
 * Represents a simple message returned by the backend.
 */
export interface ApiMessage {
  message: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {

  // Base URL for data-related backend endpoints
  private baseUrl = 'https://login-auth-roles-backend.onrender.com/data';

  // HttpClient is used to communicate with the REST API
  constructor(private http: HttpClient) {}

  /**
   * Retrieves admin-only data.
   * Access is protected by:
   * - JWT authentication
   * - Role-based authorization (admin)
   */
  getAdminData() {
    return this.http.get<ApiMessage>(`${this.baseUrl}/admin`);
  }

  /**
   * Retrieves advisor-only data.
   * Access is protected by:
   * - JWT authentication
   * - Role-based authorization (advisor)
   */
  getAdvisorData() {
    return this.http.get<ApiMessage>(`${this.baseUrl}/advisor`);
  }

  /**
   * Retrieves data available to all authenticated users.
   * Requires a valid JWT token.
   */
  getUserData() {
    return this.http.get<ApiMessage>(`${this.baseUrl}/all`);
  }
}