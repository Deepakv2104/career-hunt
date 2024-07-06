import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'career-hunt-client';

  constructor(public themeService: ThemeService, public authService: AuthService) {}

  ngOnInit() {
 // The theme service will automatically load the theme
    const userRole = this.authService.getUserRole();
    console.log('User Role:', userRole);  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isUserRole(role: string): boolean {
    return this.authService.getUserRole() === role;
  }
}
