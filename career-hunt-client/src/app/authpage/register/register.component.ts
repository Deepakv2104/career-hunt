import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service'; // Adjust the path as needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', Validators.required] // Default role is USER
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, username, phoneNumber, password, role } = this.signupForm.value;

      this.authService.register(email, username, phoneNumber, password, role).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']); // Navigate to login after successful registration
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
