import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackComponent } from '../feedback/feedback.component';
@Component({
  selector: 'app-user-dashboard-layout',
  templateUrl: './user-dashboard-layout.component.html',
  styleUrls: ['./user-dashboard-layout.component.css']
})
export class UserDashboardLayoutComponent implements OnInit {
  isDarkMode = false;
  sidebarOpen = true;
  username = '';

  constructor(private authService: AuthService, private router: Router,public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  ngOnInit() {
    this.authService.isLoggedInObservable().subscribe(loggedIn => {
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
