import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { SignupOnboardComponent } from './signup-onboard/signup-onboard.component';
import { VerificationComponent } from './verification/verification.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { AuthGuard, RegistrationGuard } from './auth.guard';
import { AboutComponent } from './about/about.component';
import { CourseListComponent } from './student-dashboard/course-list/course-list.component';
import { VideoPlayerComponent } from './student-dashboard/video-player/video-player.component';
import { AssignmentsComponent } from './student-dashboard/assignments/assignments.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    StudentDashboardComponent,
    SignupOnboardComponent,
    VerificationComponent,
    StudentUpdateComponent,
    AboutComponent,
    CourseListComponent,
    VideoPlayerComponent,
    AssignmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [AuthGuard, RegistrationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
