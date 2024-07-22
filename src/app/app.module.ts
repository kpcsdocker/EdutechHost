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
import { QuestionUploadComponent } from './admin/question-upload/question-upload.component';
import { QuestionsListComponent } from './admin/questions-list/questions-list.component';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { LessonsComponent } from './admin/lessons/lessons.component';
import { LessonsListComponent } from './admin/lessons-list/lessons-list.component';
import { AssignmentDetailComponent } from './student-dashboard/assignment-detail/assignment-detail.component';
import { AssignmentLeftReusableComponent } from './student-dashboard/assignment-leftreusable/assignment-leftreusable.component';
import { AssignmentCodeEditorComponent } from './student-dashboard/assignment-code-editor/assignment-code-editor.component';

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
    AssignmentsComponent,
    LessonsComponent,
    LessonsListComponent,
    QuestionUploadComponent,
    QuestionsListComponent,
    AssignmentDetailComponent,
    AssignmentLeftReusableComponent,
    AssignmentCodeEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfirmDialogModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [AuthGuard, RegistrationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
