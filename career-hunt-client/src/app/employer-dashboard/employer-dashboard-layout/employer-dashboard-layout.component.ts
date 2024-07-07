import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employer-dashboard-layout',
  templateUrl: './employer-dashboard-layout.component.html',
  styleUrls: ['./employer-dashboard-layout.component.css']
})
export class EmployerDashbaordLayoutComponent implements OnInit {
  isDarkMode = false;
  sidebarOpen = true;
  username = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {    this.authService.isLoggedInObservable().subscribe(loggedIn => {
    if (loggedIn) {
      this.username = this.authService.getUsername() || '';
    } else {
      this.username = ''; // Reset username if not logged in
    }
  });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
