import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {

  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']); // Navigate to login page
  }

  goToHome() {
    this.router.navigate(['/admin/dashboard']); // Navigate to home page (adjust route as needed)
  }

}
