import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
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

    // Getter for achievements FormArray
    get achievementsForms() {
      return this.profileForm.get('achievements') as FormArray;
    }
  
    // Function to add a new achievement entry
    addAchievement() {
      this.achievementsForms.push(this.fb.control(''));
    }
  
    // Getter for keySkills FormArray
    get keySkillsForms() {
      return this.profileForm.get('keySkills') as FormArray;
    }
  
    // Function to add a new key skill entry
    addKeySkill() {
      this.keySkillsForms.push(this.fb.control(''));
    }
  
    // Getter for languagesKnown FormArray
    get languagesKnownForms() {
      return this.profileForm.get('languagesKnown') as FormArray;
    }
  
    // Function to add a new language known entry
    addLanguageKnown() {
      this.languagesKnownForms.push(this.fb.control(''));
    }
  
  // Getter for certifications FormArray
 // Getter for certifications FormArray
 get certificationsForms() {
  return this.profileForm.get('certifications') as FormArray;
}

// Function to add a new certification entry
addCertification() {
  this.certificationsForms.push(this.fb.control(''));
}

  // Method to add a new education entry
  get educationForms() {
    return this.profileForm.get('education') as FormArray;
  }
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

  // Method to add a new internship entry
  get internshipsForms() {
    return this.profileForm.get('internships') as FormArray;
  }
  addInternships() {
    const internshipFormGroup = this.fb.group({
      companyName: [''],
      role: [''],
      duration: [''],
      description: ['']
    });

    this.internshipsForms.push(internshipFormGroup);
  }

  // Method to add a new project entry
  get projectsForms() {
    return this.profileForm.get('projects') as FormArray;
  }
  addProjects() {
    const projectFormGroup = this.fb.group({
      projectName: [''],
      description: [''],
      duration: ['']
    });

    this.projectsForms.push(projectFormGroup);
  }
}
