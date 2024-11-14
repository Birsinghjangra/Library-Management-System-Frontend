import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;

  private loggedIn = false;
  private permissions: any = {};

  constructor(private http: HttpClient) {}

  // Login method sends credentials and receives token and permissions
  loginAuth(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        // Extract token and permissions from the response
        const { token, permissions } = response;
        if (token) {
          localStorage.setItem('AccountId',response.data[0].id)
          localStorage.setItem('token', token); // Store token in localStorage
          this.loggedIn = true; // Update login status
        }
        if (permissions) {
          this.permissions = permissions; // Update permissions
        }
        return response; // Return the entire response
      }),
      catchError((error) => {
        // Handle error
        console.error('Login error:', error);
        return of(null); // Return observable of null in case of error
      })
    );
  }

  // Logout method clears token and resets permissions
  logout(): void {
    localStorage.removeItem('openSubmenuId');
  localStorage.removeItem('activeMenuId');
  localStorage.removeItem('AccountId')
  localStorage.removeItem('id')
  localStorage.removeItem('user')

    localStorage.removeItem('token'); // Remove token from localStorage
    this.loggedIn = false; // Update login status
    this.permissions = {}; // Clear permissions
  }

  // Check if user is authenticated based on token presence
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Return true if token is present
  }

  // Get user's permissions
  getPermissions(): any {
    return this.permissions; // Return stored permissions object
  }

  // Helper method to fetch JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token'); // Return stored token
  }
}
