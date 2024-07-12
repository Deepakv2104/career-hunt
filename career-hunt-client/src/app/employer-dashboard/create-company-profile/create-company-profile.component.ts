import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployerService } from '../../services/employer/employer.service';
import { Employer } from '../../model/employer.model';

@Component({
  selector: 'app-create-company-profile',
  templateUrl: './create-company-profile.component.html',
  styleUrls: ['./create-company-profile.component.css']
})
export class CreateCompanyProfileComponent implements OnInit {
  companyProfileForm: FormGroup;
  isUpdateMode: boolean = false;
  currentEmployer: Employer | null = null;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private employerService: EmployerService
  ) {
    this.companyProfileForm = this.fb.group({
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      companyWebsite: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmployerProfile();
  }

  loadEmployerProfile(): void {
    this.employerService.getProfile().subscribe(
      (employer) => {
        if (employer) {
          this.currentEmployer = employer;
          this.isUpdateMode = true;
          this.companyProfileForm.patchValue(employer);
        }
      },
      (error) => {
        console.error('Error fetching employer profile:', error);
      }
    );
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.companyProfileForm.valid) {
      const employer: Employer = this.companyProfileForm.value;

      if (this.isUpdateMode) {
        this.updateProfile(employer);
      } else {
        this.createProfile(employer);
      }
    } else {
      this.companyProfileForm.markAllAsTouched();
    }
  }

  createProfile(employer: Employer): void {
    this.employerService.createProfile(employer).subscribe(
      (response) => {
        console.log('Employer profile created successfully:', response);
        this.isUpdateMode = true;
        this.currentEmployer = response;
        alert('Profile created successfully!');
      },
      (error) => {
        if (error.status === 401) {
          console.error('Unauthorized: Please login again.', error);
          // Optionally, redirect to login page or show an error message
        } else {
          console.error('Error creating employer profile:', error);
        }
      }
    );
  }

  updateProfile(employer: Employer): void {
    this.employerService.updateProfile(employer).subscribe(
      (response) => {
        console.log('Employer profile updated successfully:', response);
        alert('Profile updated successfully!');
      },
      (error) => {
        if (error.status === 401) {
          console.error('Unauthorized: Please login again.', error);
          // Optionally, redirect to login page or show an error message
        } else {
          console.error('Error updating employer profile:', error);
        }
      }
    );
  }
}
