import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { UserProfile } from 'src/app/model/user-profile.model';
import { Employer } from 'src/app/model/employer.model';
import { Job } from 'src/app/model/job.model';
import { JobApplication } from 'src/app/model/job-application.model';
import { Feedback } from 'src/app/model/feedback.model';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Assume AuthService has a getToken method
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/allUsers`, { headers: this.getHeaders() });
  }

  getAllUserProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.baseUrl}/allUserProfiles`, { headers: this.getHeaders() });
  }

  getAllEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>(`${this.baseUrl}/allEmployers`, { headers: this.getHeaders() });
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/allJobs`, { headers: this.getHeaders() });
  }

  getAllJobApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.baseUrl}/allJobApplications`, { headers: this.getHeaders() });
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/allFeedbacks`, { headers: this.getHeaders() });
  }
}
