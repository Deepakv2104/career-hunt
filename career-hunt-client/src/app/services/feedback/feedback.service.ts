// feedback.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Feedback } from '../../model/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
   private apiUrl = `http://localhost:8080/feedback`;

  constructor(private http: HttpClient) { }

  postFeedback(feedback: Feedback): Observable<Feedback> {
    const token = sessionStorage.getItem('token'); // Assuming token is stored in localStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post<Feedback>(`${this.apiUrl}/post`, feedback, { headers });
  }
}
