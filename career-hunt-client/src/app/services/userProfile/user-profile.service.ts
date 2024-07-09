import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfile } from './user-profile.model';  // Adjust the import path as needed
import { Job } from '../job/job.model';  // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = `http://localhost:8080/userProfile`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    console.log('Token:', token); // Check if token is retrieved correctly
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  
  getProfile(): Observable<UserProfile> {
    const headers = this.getAuthHeaders();
    return this.http.get<UserProfile>(`${this.apiUrl}/getProfile`, { headers });
  }

  createProfile(profile: any, resume: File): Observable<UserProfile> {
    const formData: FormData = new FormData();
    formData.append('profile', JSON.stringify(profile));
    formData.append('resume', resume);
    const headers = this.getAuthHeaders();
    console.log('Headers:', headers); // Check headers before sending request
    return this.http.post<UserProfile>(`${this.apiUrl}/createProfile`, formData, { headers });
  }
  
  updateProfile(profile: any, resume: File): Observable<UserProfile> {
    const formData: FormData = new FormData();
    formData.append('profile', JSON.stringify(profile));
    formData.append('resume', resume);
    const headers = this.getAuthHeaders();
    return this.http.put<UserProfile>(`${this.apiUrl}/updateProfile`, formData, { headers });
  }

  deleteProfile(): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/deleteProfile`, { headers });
  }

  getAllJobs(): Observable<Job[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Job[]>(`${this.apiUrl}/allJobs`, { headers });
  }
}
