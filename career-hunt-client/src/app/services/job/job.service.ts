import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Job } from '../../model/job.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = `http://localhost:8080/employer/jobs`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  postJob(job: Job): Observable<Job> {
    const headers = this.getAuthHeaders();
    return this.http.post<Job>(`${this.apiUrl}/postJob`, job, { headers });
  }

  updateJob(jobId: number, job: Job): Observable<Job> {
    const headers = this.getAuthHeaders();
    return this.http.put<Job>(`${this.apiUrl}/updateJob/${jobId}`, job, { headers });
  }

  deleteJob(jobId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/deleteJob/${jobId}`, { headers });
  }

  getJobs(): Observable<Job[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Job[]>(`${this.apiUrl}/getJobs`, { headers });
  }
}
