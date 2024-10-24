import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isDarkMode = false;
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Initialize theme if necessary
    // Example: this.isDarkMode = localStorage.getItem('theme') === 'dark';
  }

  onSubmit(): void {
    this.loginError = null;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login successful', response);
          // Redirect based on user role retrieved from AuthService
          const userRole = this.authService.getUserRole();
          if (userRole === 'USER') {
            this.router.navigate(['/user-dashboard']);
          } else if (userRole === 'EMPLOYER') {
            this.router.navigate(['/employer-dashboard']);
          } else if (userRole === 'ADMIN') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            console.error('Unknown role:', userRole);
            // Handle unexpected roles or scenarios
            alert('Unknown role: ' + userRole);
          }
        },
        error => {
          console.error('Login failed', error);
          if (error.status === 401) {
            this.loginError = 'Incorrect email or password';
          } else {
            this.loginError = 'Login failed: ' + error.message;
          }
        }
      );
    } else {
      this.loginForm.markAllAsTouched(); // Mark form fields as touched to display validation errors
      alert('Please fill out the form correctly.');
    }
  }
}
