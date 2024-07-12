import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Adjust this to your Spring Boot API URL
  private loggedInSubject: BehaviorSubject<boolean>;
  private currentUser: { username: string, email: string, role: string , phoneNumber: string} | null = null;

  constructor(private http: HttpClient) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.loadUser(); // Load user data from sessionStorage on service initialization
  }

  register(email: string, username: string, phoneNumber: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, username, phoneNumber, password, role }).pipe(
      catchError(error => {
        // Handle specific error cases
        if (error.status === 409) {  // Assuming 409 Conflict for duplicate email
          return throwError(() => new Error('Email already exists.'));
        }
        return throwError(() => new Error('Registration failed.'));
      })
    );
  }

  login(email: string, password: string): Observable<{ token: string, username: string, email: string, role: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      
    });

    return this.http.post<{ token: string, username: string, email: string, role: string, phoneNumber: string }>(
      `${this.apiUrl}/authenticate`, { email, password }, { headers }
    ).pipe(
      tap(response => {
        if (response && response.token) {
          sessionStorage.setItem('token', response.token);
          // Store user information in sessionStorage
          sessionStorage.setItem('user', JSON.stringify({
            username: response.username,
            email: response.email,
            role: response.role,
            phoneNumber: response.phoneNumber
          }));
          this.currentUser = { username: response.username, email: response.email, role: response.role, phoneNumber: response.phoneNumber };
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  private loadUser() {
    const token = sessionStorage.getItem('token');
    const userStr = sessionStorage.getItem('user');
    if (token && userStr) {
      this.currentUser = JSON.parse(userStr);
      this.loggedInSubject.next(true);
    } else {
      this.currentUser = null;
      this.loggedInSubject.next(false);
    }
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.currentUser = null;
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  isLoggedInObservable(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  getUsername(): string | null {
    return this.currentUser?.username || null;
  }

  getUserEmail(): string | null {
    return this.currentUser?.email || null;
  }

  getUserRole(): string | null {
    return this.currentUser?.role || null;
  }
  getUserPhone(): string | null {
    return this.currentUser?.phoneNumber || null;
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
