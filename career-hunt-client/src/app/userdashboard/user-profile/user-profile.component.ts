import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { UserProfileService } from '../../services/userProfile/user-profile.service';
import { UserProfile } from '../../services/userProfile/user-profile.model'; // Adjust path based on your actual structure

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userProfile: UserProfile = {} as UserProfile; // Initialize userProfile
  profileForm!: FormGroup; // Declare profileForm as FormGroup
  resumeFile: File | undefined;
  constructor(
    private profileService: UserProfileService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.profileForm = this.fb.group({
      gender: [''],
      dateOfBirth: [''],
      address: [''],
      location: [''],
      education: this.fb.array([]),
      keySkills: this.fb.array([]),
      languagesKnown: this.fb.array([]),
      internships: this.fb.array([]),
      projects: this.fb.array([]),
      achievements: this.fb.array([]),
      certifications: this.fb.array([]),
      resumeFilePath: ['']
    });
  }


  createProfile() {
    const profileData = this.profileForm.value;
    
    if (!this.resumeFile) {
      console.error('No resume file selected');
      return;
    }

    this.profileService.createProfile(profileData, this.resumeFile)
      .subscribe(
        (response: UserProfile) => {
          console.log('Profile created successfully:', response);
          // Optionally reset form or handle success
          this.profileForm.reset();
          this.resumeFile = undefined; // Clear selected resume file
        },
        (error) => {
          console.error('Error creating profile:', error);
          // Handle error
        }
      );
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      this.resumeFile = files[0];
    } else {
      console.error('No resume file selected');
      // Handle case where no resume file is selected
    }
  }
  // Implement other methods like getProfile, updateProfile, deleteProfile as needed


  get educationForms() {
    return this.profileForm.get('education') as FormArray;
  }

  // Method to add a new education entry
  addEducation() {
    const educationFormGroup = this.fb.group({
      level: [''],
      schoolCollegeName: [''],
      specialization: [''],
      yearOfPassing: [''],
      cgpa: ['']
    });

    this.educationForms.push(educationFormGroup);
  }
}
