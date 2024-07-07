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
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, phoneNumber, password } = this.signupForm.value;
      const role = 'USER'; // Setting role as 'USER' by default

      this.authService.register(email, phoneNumber, password, role).subscribe(
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
