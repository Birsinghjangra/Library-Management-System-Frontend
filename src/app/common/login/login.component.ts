import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const val = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.loginAuth(val).subscribe(
      (res) => {
        if (res.status === 'success') {
          let message = res.message;
          this.snackBar.openSnackBarSuccess([message]);
          this.router.navigate(['/admin']);
        } else {
          this.snackBar.openSnackBarError([res.message]);
        }
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Failed to login. Please try again later.';
      }
    );
  }
}
