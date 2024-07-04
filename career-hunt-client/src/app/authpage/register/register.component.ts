import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  isDarkMode: boolean = false; // Assuming this variable is used for dark mode toggling

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Add more form controls as needed
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Implement registration logic here
      console.log('Form submitted:', this.signupForm.value);
    } else {
      // Mark all fields as touched to display validation messages
      this.signupForm.markAllAsTouched();
    }
  }
}
