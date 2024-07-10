import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private apiUrl = 'http://localhost:8080/resume';  // Adjust the base URL as needed

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  viewResume(resumeFilePath: string): Observable<Blob> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/viewResume/${resumeFilePath}`;
    return this.http.get(url, { headers, responseType: 'blob' }).pipe(
      map((response: Blob) => {
        return new Blob([response], { type: 'application/pdf' });
      })
    );
  }
}
