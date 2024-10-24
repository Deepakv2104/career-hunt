import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './authpage/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './authpage/login/login.component';
import { UserDashboardLayoutComponent } from './userdashboard/user-dashboard-layout/user-dashboard-layout.component';
import { FindJobsComponent } from './userdashboard/find-jobs/find-jobs.component';
import { AuthGuardService } from './services/authGuard/auth-guard.service';
import { FindPeopleComponent } from './userdashboard/find-people/find-people.component';
import { EmployerDashbaordLayoutComponent } from './employer-dashboard/employer-dashboard-layout/employer-dashboard-layout.component';
import { PostJobsComponent } from './employer-dashboard/post-jobs/post-jobs.component';
import { CreateCompanyProfileComponent } from './employer-dashboard/create-company-profile/create-company-profile.component';
import { UserProfileComponent } from './userdashboard/user-profile/user-profile.component';
import { MyApplicationsComponent } from './userdashboard/my-applications/my-applications.component';
import { ApplicationsComponent } from './employer-dashboard/applications/applications.component';
import { OverviewComponent } from './admin-dashboard/overview/overview.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard/admin-dashboard.component';
import { FeedbackComponent } from './userdashboard/feedback/feedback.component';
import { FeedbacksComponent } from './admin-dashboard/feedbacks/feedbacks.component';
import { SearchComponent } from './admin-dashboard/search/search.component';
import { SupportPageComponent } from './admin-dashboard/support-page/support-page/support-page.component';
import { HelpDeskComponent } from './userdashboard/help-desk/help-desk/help-desk.component';
import { MaintenanceComponent } from './admin-dashboard/maintenance/maintenance/maintenance.component';
import { UserGuardService } from './services/authGuard/user-guard/user-guard.service';
import { EmployerGuardService } from './services/authGuard/employer-guard/employer-guard.service';
import { AdminGuardService } from './services/authGuard/admin-guard/admin-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  {
    path: 'user-dashboard',
    component: UserDashboardLayoutComponent,
    canActivate: [UserGuardService], // Protect the user-dashboard route
    children: [
      { path: '', redirectTo: 'search-jobs', pathMatch: 'full' },
      { path: 'search-jobs', component: FindJobsComponent, canActivate: [UserGuardService] },
      { path: 'search-people', component: FindPeopleComponent, canActivate: [UserGuardService] },
      { path: 'user-profile', component: UserProfileComponent, canActivate: [UserGuardService] },
      { path: 'my-applications', component: MyApplicationsComponent, canActivate: [UserGuardService] },
      { path: 'feedback', component: FeedbackComponent, canActivate: [UserGuardService] },
      { path: 'support', component: HelpDeskComponent, canActivate: [UserGuardService] }
    ]
  },
  {
    path: 'employer-dashboard',
    component: EmployerDashbaordLayoutComponent,
    canActivate: [EmployerGuardService], // Protect the employer-dashboard route
    children: [
      { path: '', redirectTo: 'post-jobs', pathMatch: 'full' },
      { path: 'post-jobs', component: PostJobsComponent, canActivate: [EmployerGuardService] },
      { path: 'create-company-profile', component: CreateCompanyProfileComponent, canActivate: [EmployerGuardService] },
      { path: 'applications', component: ApplicationsComponent, canActivate: [EmployerGuardService] },
      { path: 'search-people', component: FindPeopleComponent, canActivate: [EmployerGuardService] },
      { path: 'help', component: HelpDeskComponent, canActivate: [EmployerGuardService] }
    ]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuardService], // Protect the admin-dashboard route
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent, canActivate: [AdminGuardService] },
      { path: 'feedbacks', component: FeedbacksComponent, canActivate: [AdminGuardService] },
      { path: 'search', component: SearchComponent, canActivate: [AdminGuardService] },
      { path: 'support', component: SupportPageComponent, canActivate: [AdminGuardService] },
      { path: 'maintenance', component: MaintenanceComponent, canActivate: [AdminGuardService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

