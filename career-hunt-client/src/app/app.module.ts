import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { LoginComponent } from './authpage/login/login.component';
import { RegisterComponent } from './authpage/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FindPeopleComponent } from './userdashboard/find-people/find-people.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ThemeToggleComponent,
    LoginComponent,
    RegisterComponent,
    
    FindPeopleComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,

    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
