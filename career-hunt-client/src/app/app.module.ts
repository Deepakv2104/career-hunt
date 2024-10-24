import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from './authpage/login/login.component';
import { RegisterComponent } from './authpage/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FindPeopleComponent } from './userdashboard/find-people/find-people.component';
import { FindJobsComponent } from './userdashboard/find-jobs/find-jobs.component';
import { JobInfoComponent } from './userdashboard/job-info/job-info.component';
import { EmployerDashbaordLayoutComponent } from './employer-dashboard/employer-dashboard-layout/employer-dashboard-layout.component';
import { CreateCompanyProfileComponent } from './employer-dashboard/create-company-profile/create-company-profile.component';
import { PostJobsComponent } from './employer-dashboard/post-jobs/post-jobs.component';
import { ApplicationsComponent } from './employer-dashboard/applications/applications.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardLayoutComponent } from './userdashboard/user-dashboard-layout/user-dashboard-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './userdashboard/user-profile/user-profile.component';
import { MyApplicationsComponent } from './userdashboard/my-applications/my-applications.component';
import { ApplicationDetailsDialogComponent } from './employer-dashboard/application-details-dialog/application-details-dialog.component';
import { OverviewComponent } from './admin-dashboard/overview/overview.component';
import { FeedbackComponent } from './userdashboard/feedback/feedback.component';
import { FeedbackService } from './services/feedback/feedback.service';
import { MatInputModule } from '@angular/material/input';
import { FeedbacksComponent } from './admin-dashboard/feedbacks/feedbacks.component';
import { SearchComponent } from './admin-dashboard/search/search.component';
import { ReplyDialogComponent } from './admin-dashboard/reply-dialog/reply-dialog/reply-dialog.component';
import { SupportPageComponent } from './admin-dashboard/support-page/support-page/support-page.component';
import { HelpDeskComponent } from './userdashboard/help-desk/help-desk/help-desk.component';
import { MaintenanceComponent } from './admin-dashboard/maintenance/maintenance/maintenance.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ThemeToggleComponent,
    LoginComponent,
    RegisterComponent,
    
    FindPeopleComponent,
          FindJobsComponent,
          JobInfoComponent,
          EmployerDashbaordLayoutComponent,
          CreateCompanyProfileComponent,
          PostJobsComponent,
          ApplicationsComponent,
          AdminDashboardComponent,
          UserDashboardLayoutComponent,
          UserProfileComponent,
          MyApplicationsComponent,
          ApplicationDetailsDialogComponent,
          OverviewComponent,
          FeedbackComponent,
          FeedbacksComponent,
          SearchComponent,
          ReplyDialogComponent,
          SupportPageComponent,
          HelpDeskComponent,
          MaintenanceComponent,
         

   
  ],
  imports: [
    // BaseChartDirective,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule
  
  ],
  providers: [FeedbackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
