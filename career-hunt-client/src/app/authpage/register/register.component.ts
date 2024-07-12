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
      username: [
        '', 
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]+$')  // Only letters and spaces
        ]
      ],
      email: [
        '', 
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') // Standard email pattern
        ]
      ],
      phoneNumber: [
        '', 
        [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$')  // Must start with 6/7/8/9 and be 10 digits
        ]
      ],
      password: [
        '', 
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
      role: ['USER', Validators.required]  // Default role is USER
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
          alert('Registration failed: ' + error.message); // Show error message
        }
      );
    } else {
      this.signupForm.markAllAsTouched();
      alert('Please fill out the form correctly.');
    }
  }
}
