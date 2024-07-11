import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap, throwError } from 'rxjs';
import { JobApplication } from '../../model/job-application.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  private apiUrl = 'http://localhost:8080/applications';  // Adjust the base URL as needed

  constructor(private http: HttpClient, private authService: AuthService) { }

  applyForJob(jobId: number): Observable<any> {
    const token = this.authService.getToken();  // Get the JWT token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Check if the user has already applied
    return this.hasUserApplied(jobId).pipe(
      switchMap((hasApplied: boolean) => {
        if (hasApplied) {
          // User has already applied, handle accordingly (e.g., show message)
          return throwError('User has already applied for this job.');
        } else {
          // User has not applied yet, proceed with the application
          return this.http.post(`${this.apiUrl}/apply/${jobId}`, {}, { headers });
        }
      })
    );
  }
  
  // Method to check if the user has already applied for a job
  private hasUserApplied(jobId: number): Observable<boolean> {
    return this.getApplicationsForUser().pipe(
      map(applications => applications.some(app => app.job.jobId === jobId))
    );
  }
  

  getApplicationsForJob(jobId: number): Observable<JobApplication[]> {
    const token = this.authService.getToken();  // Get the JWT token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<JobApplication[]>(`${this.apiUrl}/job/${jobId}`,{headers});
  }

  getApplicationsForEmployer(): Observable<JobApplication[]> {
    const token = this.authService.getToken();  // Get the JWT token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<JobApplication[]>(`${this.apiUrl}/allApplications`,{headers});
  }

  getApplicationsForUser(): Observable<JobApplication[]> {
    const token = this.authService.getToken();  // Get the JWT token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<JobApplication[]>(`${this.apiUrl}/myApplications`,{ headers });
  }

  updateApplicationStatus(applicationId: number, status: string): Observable<JobApplication> {
    const token = this.authService.getToken();  // Get the JWT token from AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<JobApplication>(`${this.apiUrl}/updateStatus/${applicationId}/${status}`, {},{headers});
  }
}
