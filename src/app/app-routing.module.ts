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

const routes: Routes = [
  {path:'signup-onboard', component: SignupOnboardComponent},
  {path:'stu-dashboard', component: StudentDashboardComponent, canActivate: [AuthGuard] },
  {path:'register', component: RegistrationComponent},
  {path:'login', component: LoginComponent},
  {path:'verify', component: VerificationComponent, canActivate: [RegistrationGuard] },
  {path:'update', component: StudentUpdateComponent, canActivate: [SocialLoginGuard] },
  {path:'', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
