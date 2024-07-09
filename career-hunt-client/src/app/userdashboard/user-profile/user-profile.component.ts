import { Component } from '@angular/core';
import { UserProfileService } from 'src/app/services/userProfile/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userProfile: any = {};
  selectedFile: File | null = null;

  constructor(private userProfileService: UserProfileService) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createUserProfile() {
    const formData = new FormData();
    formData.append('profile', JSON.stringify(this.userProfile));
    if (this.selectedFile) {
      formData.append('resume', this.selectedFile);
    }

    this.userProfileService.saveUserProfile(formData).subscribe(
      (response) => {
        console.log('Profile created successfully', response);
      },
      (error) => {
        console.error('Error creating profile', error);
      }
    );
  }
}
