import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service'; // Adjust the path as needed
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isDarkMode = false;
  loginForm: FormGroup;
  returnUrl: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Initialize theme if necessary
    // Example: this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user-dashboard/search-jobs';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate([this.returnUrl]); // Navigate to returnUrl after successful login
        },
        error => {
          console.error('Login failed', error);
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
