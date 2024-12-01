import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snackbar.service';
// import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  errorMessage: string = '';
  passwordHidden = true;
  passwordVisible: boolean = false;

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
      rememberMe: [false], // Initialize rememberMe form control
    });

    // Retrieve credentials from localStorage (if they exist)
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    
    if (storedEmail && storedPassword) {
      this.loginForm.patchValue({
        email: storedEmail,
        password: storedPassword,
        rememberMe: true,  // Auto-check "Remember Me" if credentials are found
      });
      console.log('Auto-filled credentials from localStorage');
    } else {
      console.log('No stored credentials found');
    }
  }

  get f() {
    return this.loginForm.controls;
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    const inputField = document.getElementById('passwordInput') as HTMLInputElement;
    inputField.type = this.passwordVisible ? 'text' : 'password';
    
    const eyeIcon = document.getElementById('eyeIcon');
    if (eyeIcon) {
      eyeIcon.className = this.passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash';
    }
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
        // console.log(res);
        // return

        if (res.status === 'success') {
          localStorage.setItem('user', res.data[0].role_name);
          localStorage.setItem('token', res.token);
          let message = res.message;
          // this.snackBar.openSnackBarSuccess([message]);
          this.router.navigate(['/admin']);

          // If "Remember Me" is checked, save the credentials in localStorage
          if (this.loginForm.value.rememberMe) {
            localStorage.setItem('email', this.loginForm.value.email);
            localStorage.setItem('password', this.loginForm.value.password);
            console.log('Credentials saved in localStorage');
          } else {
            // Clear stored credentials if "Remember Me" is unchecked
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            console.log('Credentials cleared from localStorage');
          }
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
