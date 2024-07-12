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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  {
    path: 'user-dashboard',
    component: UserDashboardLayoutComponent,
    canActivate: [AuthGuardService], // Protect the user-dashboard route
    children: [
      { path: '', redirectTo: 'search-jobs', pathMatch: 'full' },
      { path: 'search-jobs', component: FindJobsComponent, canActivate: [AuthGuardService] }, 
      { path: 'search-people', component: FindPeopleComponent, canActivate: [AuthGuardService] }, 
      { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardService] }, // Protect child routes
      { path: 'my-applications', component: MyApplicationsComponent, canActivate: [AuthGuardService] },
      { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuardService] },

    ]
  },
  {
    path: 'employer-dashboard',
    component: EmployerDashbaordLayoutComponent,
    canActivate: [AuthGuardService], // Protect the employer-dashboard route
    children: [
      { path: '', redirectTo: 'post-jobs', pathMatch: 'full' },
      { path: 'post-jobs', component: PostJobsComponent, canActivate: [AuthGuardService] }, // Protect child routes
      { path: 'create-company-profile', component: CreateCompanyProfileComponent, canActivate: [AuthGuardService] }, // Protect child routes
      { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuardService] } // Protect child routes

    ]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuardService], // Protect the employer-dashboard route
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent, canActivate: [AuthGuardService] }, 
      { path: 'feedbacks', component: FeedbacksComponent, canActivate: [AuthGuardService] }, 
      { path: 'search', component: SearchComponent, canActivate: [AuthGuardService] }, 

      // { path: 'create-company-profile', component: CreateCompanyProfileComponent, canActivate: [AuthGuardService] }, // Protect child routes
      // { path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuardService] } // Protect child routes

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
