import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserProfileService } from '../../services/userProfile/user-profile.service';
import { UserProfile } from '../../model/user-profile.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ResumeService } from 'src/app/services/resume/resume.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile: UserProfile = {} as UserProfile;
  profileForm!: FormGroup;
  resumeFile: File | undefined;
  selectedFileName: string = '';
  isEditMode = false;
  username = '';
  phoneNumber = '';
  email = '';
  resumeFilePath: string = '';

  constructor(
    private profileService: UserProfileService,
    private fb: FormBuilder,
    private authService: AuthService,
    private resumeService: ResumeService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.authService.isLoggedInObservable().subscribe(loggedIn => {
      if (loggedIn) {
        this.username = this.authService.getUsername() || '';
        this.email = this.authService.getUserEmail() || '';
        this.phoneNumber = this.authService.getUserPhone() || '';
      } else {
        this.username = ''; // Reset username if not logged in
      }
    });
    this.profileService.getProfile().subscribe(
      (data: UserProfile) => {
        if (data) {
          this.userProfile = data;
          this.setFormValues(data);
          this.isEditMode = true;
          this.resumeFilePath = data.resumeFilePath || '';
          if (this.resumeFilePath) {
            this.selectedFileName = this.resumeFilePath.split('/').pop() || '';
          }
          console.log(this.userProfile);
        }
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  setFormValues(data: UserProfile) {
    console.log('Data received:', data);

    this.profileForm.patchValue({
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      address: data.address,
      location: data.location,
      resumeFilePath: data.resumeFilePath
    });

    this.setFormArrayValues('education', data.education);
    this.setFormArrayValues('keySkills', data.keySkills);
    this.setFormArrayValues('languagesKnown', data.languagesKnown);
    this.setFormArrayValues('internships', data.internships);
    this.setFormArrayValues('projects', data.projects);
    this.setFormArrayValues('achievements', data.achievements);
    this.setFormArrayValues('certifications', data.certifications);
  }

  setFormArrayValues(arrayName: string, values: any[]) {
    const formArray = this.profileForm.get(arrayName) as FormArray;
    formArray.clear();
  
    values.forEach(value => {
      if (arrayName === 'education') {
        const educationFormGroup = this.fb.group({
          level: [value.level, Validators.required],
          schoolCollegeName: [value.schoolCollegeName, Validators.required],
          specialization: [value.specialization, Validators.required],
          yearOfPassing: [value.yearOfPassing, [Validators.required, Validators.pattern(/^\d{4}$/)]],
          cgpa: [value.cgpa, [Validators.required, Validators.min(0), Validators.max(10)]]
        });
        formArray.push(educationFormGroup);
      } else if (arrayName === 'keySkills' || arrayName === 'languagesKnown' || arrayName === 'achievements' || arrayName === 'certifications') {
        formArray.push(this.fb.control(value, Validators.required));
      } else if (arrayName === 'internships') {
        const internshipFormGroup = this.fb.group({
          companyName: [value.companyName, Validators.required],
          role: [value.role, Validators.required],
          duration: [value.duration, Validators.required],
          description: [value.description, Validators.required]
        });
        formArray.push(internshipFormGroup);
      } else if (arrayName === 'projects') {
        const projectFormGroup = this.fb.group({
          projectName: [value.projectName, Validators.required],
          description: [value.description, Validators.required],
          duration: [value.duration, Validators.required]
        });
        formArray.push(projectFormGroup);
      } else {
        formArray.push(this.fb.control(value, Validators.required));
      }
    });
  }
  
  

  createForm() {
    this.profileForm = this.fb.group({
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', Validators.required],
      education: this.fb.array([]),
      keySkills: this.fb.array([]),
      languagesKnown: this.fb.array([]),
      internships: this.fb.array([]),
      projects: this.fb.array([]),
      achievements: this.fb.array([]),
      certifications: this.fb.array([]),
      resumeFilePath: ['', Validators.required]
    });
  }
  

  createProfile() {
    // if (this.profileForm.invalid) {
    //   console.error('Form invalid. Cannot submit.');
    //   return;
    // }
  
    const profileData = this.profileForm.value;
  
    if (!this.resumeFile) {
      console.error('No resume file selected');
      alert('No resume file selected');
      return;
    }
  
    this.profileService.createProfile(profileData, this.resumeFile)
      .subscribe(
        (response: UserProfile) => {
          console.log('Profile created successfully:', response);
          alert('Profile created successfully');
          this.profileForm.reset();
          this.resumeFile = undefined;
        },
        (error) => {
          console.error('Error creating profile:', error);
          alert('Error creating profile');
        }
      );
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateProfile();
    } else {
      this.createProfile();
    }
  }


  updateProfile() {
    if (this.profileForm.invalid) {
      console.error('Form invalid. Cannot submit.');
      alert('Form invalid. Cannot submit.');

      // Log errors for each form control
      Object.keys(this.profileForm.controls).forEach(key => {
        const controlErrors = this.profileForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.error(`Control '${key}' has error '${keyError}' with value '${controlErrors[keyError]}'`);
          });
        }
      });
  
      return;
    }
  
    const profileData = this.profileForm.value;
  
    if (!this.resumeFile) {
      console.error('No resume file selected');
      return;
    }
  
    this.profileService.updateProfile(profileData, this.resumeFile)
      .subscribe(
        (response: UserProfile) => {
          console.log('Profile updated successfully:', response);
          alert('Profile updated successfully');
          this.profileForm.reset();
          this.resumeFile = undefined;
          this.selectedFileName = '';
          // Optionally, reload or fetch updated profile data
          this.loadProfile();
        },
        (error) => {
          console.error('Error updating profile:', error);
          alert('Error updating profile');
        }
      );
  }
  
  deleteProject(index: number): void {
    this.projectsForms.removeAt(index);
  }

  deleteInternship(index: number): void {
    this.internshipsForms.removeAt(index);
  }

  deleteEducation(index: number): void {
    this.educationForms.removeAt(index);
  }

  deleteKeySkill(index: number): void {
    this.keySkillsForms.removeAt(index);
  }

  deleteAchievement(index: number): void {
    this.achievementsForms.removeAt(index);
  }

  deleteCertification(index: number): void {
    this.certificationsForms.removeAt(index);
  }

  deleteLanguage(index: number): void {
    this.languagesKnownForms.removeAt(index);
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      this.resumeFile = files[0];
      this.selectedFileName = this.resumeFile.name;
    } else {
      console.error('No resume file selected');
    }
  }

  get achievementsForms() {
    return this.profileForm.get('achievements') as FormArray;
  }

  addAchievement() {
    this.achievementsForms.push(this.fb.control(''));
  }

  // Methods for adding skills and projects
  get keySkillsForms() {
    return this.profileForm.get('keySkills') as FormArray;
  }

  addKeySkill() {
    this.keySkillsForms.push(this.fb.control('', Validators.required));
  }
  get languagesKnownForms() {
    return this.profileForm.get('languagesKnown') as FormArray;
  }

  addLanguageKnown() {
    this.languagesKnownForms.push(this.fb.control(''));
  }

  get certificationsForms() {
    return this.profileForm.get('certifications') as FormArray;
  }

  addCertification() {
    this.certificationsForms.push(this.fb.control(''));
  }

  get educationForms() {
    return this.profileForm.get('education') as FormArray;
  }

  
  addEducation() {
    const educationFormGroup = this.fb.group({
      level: ['', Validators.required],
      schoolCollegeName: ['', Validators.required],
      specialization: ['', Validators.required],
      yearOfPassing: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      cgpa: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  
    this.educationForms.push(educationFormGroup);
  }
  

  get internshipsForms() {
    return this.profileForm.get('internships') as FormArray;
  }
  addInternships() {
    const internshipFormGroup = this.fb.group({
      companyName: ['', Validators.required],
      role: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.internshipsForms.push(internshipFormGroup);
  }

  get projectsForms() {
    return this.profileForm.get('projects') as FormArray;
  }

  addProjects() {
    const projectFormGroup = this.fb.group({
      projectName: ['', Validators.required],
      description: ['',Validators.required],
      duration: ['', Validators.required]
    });

    this.projectsForms.push(projectFormGroup);
  }

  viewResume(resumeFilePath: string) {
    this.resumeService.viewResume(resumeFilePath).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      (error) => {
        console.error('Error fetching resume:', error);
      }
    );
  }
}
