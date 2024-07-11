import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
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
          level: [value.level],
          schoolCollegeName: [value.schoolCollegeName],
          specialization: [value.specialization],
          yearOfPassing: [value.yearOfPassing],
          cgpa: [value.cgpa]
        });
        formArray.push(educationFormGroup);
      } else if (arrayName === 'keySkills' || arrayName === 'languagesKnown' || arrayName === 'achievements' || arrayName === 'certifications') {
        formArray.push(this.fb.control(value));
      } else if (arrayName === 'internships') {
        const internshipFormGroup = this.fb.group({
          companyName: [value.companyName],
          role: [value.role],
          duration: [value.duration],
          description: [value.description]
        });
        formArray.push(internshipFormGroup);
      } else if (arrayName === 'projects') {
        const projectFormGroup = this.fb.group({
          projectName: [value.projectName],
          description: [value.description],
          duration: [value.duration]
        });
        formArray.push(projectFormGroup);
      } else {
        formArray.push(this.fb.control(value));
      }
    });
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

  get keySkillsForms() {
    return this.profileForm.get('keySkills') as FormArray;
  }
  addKeySkill() {
    this.keySkillsForms.push(this.fb.control(''));
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
      level: [''],
      schoolCollegeName: [''],
      specialization: [''],
      yearOfPassing: [''],
      cgpa: ['']
    });

    this.educationForms.push(educationFormGroup);
  }

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
