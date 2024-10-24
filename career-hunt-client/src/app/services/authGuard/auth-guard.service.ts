import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getUserRole();
      if (userRole === 'USER') {
        // Allow access to routes for USER role
        return true;
      } else if (userRole === 'EMPLOYER') {
        // Allow access to routes for EMPLOYER role
        return true;
      }else if (userRole === 'ADMIN') {
        // Allow access to routes for EMPLOYER role
        return true;
      }
       else {
        // Redirect to unauthorized or handle other roles as needed
        console.error('Unknown role:', userRole);
        return false;
      }
    }

    // Not logged in, redirect to login page with returnUrl
   
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    this.authService.logout();
  
    return false;
  }
}
