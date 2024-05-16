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
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider  } from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('403833081907-4bvvm70dmdauvoarbcftd1a3lhr25q4u.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    StudentDashboardComponent,
    SignupOnboardComponent,
    VerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [{provide: AuthServiceConfig,
    useFactory: provideConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
