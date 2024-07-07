import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'; // Adjust the path as needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard-layout',
  templateUrl: './user-dashboard-layout.component.html',
  styleUrls: ['./user-dashboard-layout.component.css']
})
export class UserDashboardLayoutComponent implements OnInit {
  isDarkMode = false;
  sidebarOpen = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Initialize theme if necessary
    // Example: this.isDarkMode = localStorage.getItem('theme') === 'dark';
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
