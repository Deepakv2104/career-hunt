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
      { path: 'search-jobs', component: FindJobsComponent, canActivate: [AuthGuardService] }, // Protect child routes
      { path: 'search-people', component: FindPeopleComponent, canActivate: [AuthGuardService] }, // Protect child routes
    ]
  },
  {
    path: 'employer-dashboard',
    component: EmployerDashbaordLayoutComponent,
    canActivate: [AuthGuardService], // Protect the employer-dashboard route
    children: [
      { path: '', redirectTo: 'post-jobs', pathMatch: 'full' },
      { path: 'post-jobs', component: PostJobsComponent, canActivate: [AuthGuardService] }, // Protect child routes
      { path: 'create-company-profile', component: CreateCompanyProfileComponent, canActivate: [AuthGuardService] } // Protect child routes

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
