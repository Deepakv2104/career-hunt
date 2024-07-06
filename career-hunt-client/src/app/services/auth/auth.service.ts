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

  constructor(private http: HttpClient) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  }

  login(email: string, password: string): Observable<{ token: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<{ token: string }>(`${this.apiUrl}/authenticate`, { email, password }, { headers }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.loggedInSubject.next(true); // Update logged in status
        }
      })
    );
  }

  register(email: string, phoneNumber: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, phoneNumber, password, role });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false); // Update logged in status
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedInObservable(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.sub : null; // Assuming 'sub' contains the username in your JWT payload
    }
    return null;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        console.error('Invalid JWT token format');
        return null;
      }
      
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload ? payload.role : null; // Assuming 'role' is present in the JWT payload
    }
    return null;
  }
  
  
  
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private decodeToken(token: string): any {
    try {
      const jwtPayload = JSON.parse(atob(token.split('.')[1]));
      return jwtPayload;
    } catch (error) {
      console.error('Error decoding token');
      return null;
    }
  }
}
