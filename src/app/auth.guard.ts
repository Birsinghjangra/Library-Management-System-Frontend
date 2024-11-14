// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
// import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // Check additional permissions logic here if needed
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      // this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}
