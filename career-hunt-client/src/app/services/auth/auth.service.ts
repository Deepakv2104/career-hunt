import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Adjust this to your Spring Boot API URL
  private loggedInSubject: BehaviorSubject<boolean>;
  private currentUser: { username: string, email: string, role: string } | null = null;

  constructor(private http: HttpClient) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.loadUser(); // Load user data from localStorage on service initialization
  }


  register(email: string, username: string, phoneNumber: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, username, phoneNumber, password, role });
  }
  login(email: string, password: string): Observable<{ token: string, username: string, email: string, role: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<{ token: string, username: string, email: string, role: string }>(
      `${this.apiUrl}/authenticate`, { email, password }, { headers }
    ).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          // Store user information in localStorage
          localStorage.setItem('user', JSON.stringify({
            username: response.username,
            email: response.email,
            role: response.role
          }));
          this.currentUser = { username: response.username, email: response.email, role: response.role };
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  private loadUser() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      this.currentUser = JSON.parse(userStr);
      this.loggedInSubject.next(true);
    } else {
      this.currentUser = null;
      this.loggedInSubject.next(false);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser = null;
    this.loggedInSubject.next(false);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
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

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
