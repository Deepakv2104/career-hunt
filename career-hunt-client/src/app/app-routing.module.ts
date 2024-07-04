import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './authpage/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './authpage/login/login.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
{path:'login',component:LoginComponent},
{ path: 'signup', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
