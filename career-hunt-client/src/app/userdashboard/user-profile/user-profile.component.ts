import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms'; // Import FormArray and AbstractControl
import { UserProfileService } from '../../services/userProfile/user-profile.service';
import { UserProfile } from '../../services/userProfile/user-profile.model'; // Adjust the import path as needed

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfileForm!: FormGroup;
  userProfile: UserProfile | null = null; // Initialize userProfile as null or undefined

  constructor(
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.initForm(); // Initialize the form

    // Optionally, fetch and populate the user profile data initially
    this.fetchUserProfile();
  }

  private initForm(): void {
    this.userProfileForm = this.formBuilder.group({
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      location: ['', Validators.required],
      education: this.formBuilder.array([]), // Initialize as empty array
      keySkills: this.formBuilder.array([]),
      languagesKnown: this.formBuilder.array([]),
      internships: this.formBuilder.array([]),
      projects: this.formBuilder.array([]),
      achievements: this.formBuilder.array([]),
      certifications: this.formBuilder.array([])
    } as Record<string, any>); // Type assertion for FormGroup

    // Optionally, set up initial form values here if needed
  }

  fetchUserProfile(): void {
    this.userProfileService.getProfile().subscribe(
      (profile: UserProfile) => {
        this.userProfile = profile;
        this.patchFormValues(profile); // Patch fetched values to form
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        // Handle error (e.g., show error message to user)
      }
    );
  }

  private patchFormValues(profile: UserProfile): void {
    this.userProfileForm.patchValue({
      gender: profile.gender,
      dateOfBirth: profile.dateOfBirth,
      address: profile.address,
      location: profile.location,
      keySkills: profile.keySkills || [],
      languagesKnown: profile.languagesKnown || [],
      education: profile.education ? profile.education.map(edu => this.createEducationFormGroup(edu)) : [],
      internships: profile.internships ? profile.internships.map(internship => this.createInternshipFormGroup(internship)) : [],
      projects: profile.projects ? profile.projects.map(project => this.createProjectFormGroup(project)) : [],
      achievements: profile.achievements || [],
      certifications: profile.certifications || []
    });
  }

  // Helper method to create FormGroup for education with initial values
  private createEducationFormGroup(edu?: any): FormGroup {
    return this.formBuilder.group({
      level: [edu?.level || '', Validators.required],
      schoolCollegeName: [edu?.schoolCollegeName || '', Validators.required],
      specialization: [edu?.specialization || '', Validators.required],
      yearOfPassing: [edu?.yearOfPassing || '', Validators.required],
      cgpa: [edu?.cgpa || '', Validators.required]
    });
  }

  // Helper method to create FormGroup for internship with initial values
  private createInternshipFormGroup(internship?: any): FormGroup {
    return this.formBuilder.group({
      companyName: [internship?.companyName || '', Validators.required],
      role: [internship?.role || '', Validators.required],
      duration: [internship?.duration || '', Validators.required],
      description: [internship?.description || '', Validators.required]
    });
  }

  // Helper method to create FormGroup for project with initial values
  private createProjectFormGroup(project?: any): FormGroup {
    return this.formBuilder.group({
      projectName: [project?.projectName || '', Validators.required],
      description: [project?.description || '', Validators.required],
      duration: [project?.duration || '', Validators.required]
    });
  }

  onSaveUserProfile(): void {
    if (this.userProfileForm.valid) {
      const userProfileData = this.userProfileForm.value;
      this.userProfileService.saveUserProfile(userProfileData).subscribe(
        () => {
          console.log('User profile saved successfully!');
          // Optionally, you can navigate to another page or show a success message
        },
        (error) => {
          console.error('Error saving user profile:', error);
          // Handle error (e.g., show error message to user)
        }
      );
    } else {
      console.error('Form is invalid. Cannot save user profile.');
      // Optionally, you can display a message to the user that the form is invalid
    }
  }
}
