import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserProfile } from './user-profile.model';  // Adjust the import path as needed
import { Job } from '../job/job.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'http://localhost:8080/userProfile'; // Adjust this to your Spring Boot API URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      console.error('No token available.');
      return new HttpHeaders();
    }
  }

  getProfile(): Observable<UserProfile> {
    const headers = this.getAuthHeaders();
    return this.http.get<UserProfile>(`${this.apiUrl}/getProfile`, { headers })
      .pipe(catchError(this.handleError));
  }

  saveUserProfile(userProfileData: UserProfile): Observable<any> {
    const headers = this.getAuthHeaders();

    // Assuming your backend expects the entire userProfileData object in JSON format
    return this.http.post(`${this.apiUrl}/createProfile`, userProfileData, { headers })
      .pipe(catchError(this.handleError));
  }

  updateProfile(userProfileData: UserProfile): Observable<UserProfile> {
    const headers = this.getAuthHeaders();

    // Assuming your backend expects the entire userProfileData object in JSON format
    return this.http.put<UserProfile>(`${this.apiUrl}/updateProfile`, userProfileData, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteProfile(): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/deleteProfile`, { headers })
      .pipe(catchError(this.handleError));
  }

  getAllJobs(): Observable<Job[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Job[]>(`${this.apiUrl}/allJobs`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Handle 401 Unauthorized error (e.g., redirect to login page or refresh token)
      console.error('Unauthorized request:', error.message);
      // Implement token refresh logic or redirect to login
    }
    return throwError(() => new Error('An error occurred: ' + error.message));
  }
}
