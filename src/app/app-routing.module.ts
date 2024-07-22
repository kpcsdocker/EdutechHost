import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, RegistrationGuard, SocialLoginGuard} from './auth.guard';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { SignupOnboardComponent } from './signup-onboard/signup-onboard.component';
import { VerificationComponent } from './verification/verification.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { AboutComponent } from './about/about.component';
import { CourseListComponent } from './student-dashboard/course-list/course-list.component';
import { VideoPlayerComponent } from './student-dashboard/video-player/video-player.component';
import { AssignmentsComponent } from './student-dashboard/assignments/assignments.component';
import { AssignmentDetailComponent } from './student-dashboard/assignment-detail/assignment-detail.component';
import { AssignmentCodeEditorComponent } from './student-dashboard/assignment-code-editor/assignment-code-editor.component';
import { QuestionUploadComponent } from './admin/question-upload/question-upload.component';
import { QuestionsListComponent } from './admin/questions-list/questions-list.component';
import { LessonsComponent } from './admin/lessons/lessons.component';
import { LessonsListComponent } from './admin/lessons-list/lessons-list.component';

const routes: Routes = [
  {path:'signup-onboard', component: SignupOnboardComponent},
  {path:'stu-dashboard', component: StudentDashboardComponent, canActivate: [AuthGuard] },      
  {path: 'stu-dashboard/courses', component: CourseListComponent, canActivate: [AuthGuard] },
  {path: 'stu-dashboard/video-player', component: VideoPlayerComponent, canActivate: [AuthGuard]  },
  {path: 'stu-dashboard/assignments', component: AssignmentsComponent, canActivate: [AuthGuard]  },
  {path: 'stu-dashboard/assignment-detail', component: AssignmentDetailComponent, canActivate: [AuthGuard]   },
  {path: 'stu-dashboard/assignment-code-editor', component: AssignmentCodeEditorComponent },
  {path:'register', component: RegistrationComponent},
  {path:'login', component: LoginComponent},
  {path: 'about', component: AboutComponent },
  {path:'verify', component: VerificationComponent, canActivate: [RegistrationGuard] },
  {path:'update', component: StudentUpdateComponent, canActivate: [SocialLoginGuard] },
  {path:'upload', component: QuestionUploadComponent, canActivate: [AuthGuard]},
  {path:'list', component: QuestionsListComponent, canActivate: [AuthGuard]},
  {path:'lessons', component: LessonsComponent},
  {path:'lessonsList', component: LessonsListComponent},
  {path:'', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
