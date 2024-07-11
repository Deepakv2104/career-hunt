import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employer } from '../../model/employer.model'; // Adjust the path and model as needed
import { AuthService } from '../auth/auth.service'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private apiUrl = `http://localhost:8080/employer`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createProfile(employer: Employer): Observable<Employer> {
    const headers = this.getAuthHeaders();
    return this.http.post<Employer>(`${this.apiUrl}/createProfile`, employer, { headers });
  }

  getProfile(): Observable<Employer> {
    const headers = this.getAuthHeaders();
    return this.http.get<Employer>(`${this.apiUrl}/getProfile`, { headers });
  }

  updateProfile(employer: Employer): Observable<Employer> {
    const headers = this.getAuthHeaders();
    return this.http.put<Employer>(`${this.apiUrl}/updateProfile`, employer, { headers });
  }

  deleteProfile(): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/deleteProfile`, { headers });
  }
}
