import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { UserMailComponent } from './user-mail/user-mail.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { JuristicFormComponent } from './juristic-form/juristic-form.component';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EmailVerifyComponent,
    SignupComponent,
    UserMailComponent,
    CustomerFormComponent,
    JuristicFormComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule,
  ]
})
export class RegistrationModule { }
