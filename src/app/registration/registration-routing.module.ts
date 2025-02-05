import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { JuristicFormComponent } from './juristic-form/juristic-form.component';
import { UserMailComponent } from './user-mail/user-mail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-resert', component: EmailVerifyComponent },
  { path: 'password-resert', redirectTo: '/password-resert' },
  { path: 'password-mail', component: ResetPasswordComponent },
  { path: 'password-mail', redirectTo: '/password-mail'},
  { path: 'signup', component:SignupComponent},
  { path: 'customer-form', component:CustomerFormComponent},
  { path: 'juristic-form', component:JuristicFormComponent},
  { path: 'email-success', component:UserMailComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
