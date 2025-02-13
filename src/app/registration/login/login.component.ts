import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword: boolean = true;
  loginForm_submitted: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private adminService: AdminService, 
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  isEmail(id: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(id);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = {
        records: {
          email: this.loginForm.value.username,
          password: this.loginForm.value.password
        }
      };
      this.adminService.post('/Login', data).subscribe(res => {
        if (res.dataStatus) {
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('loginId', this.loginForm.value.username);

          const id = this.loginForm.value.username;
          const isEmail = this.isEmail(id);

          if (isEmail) {
            this.router.navigate(['/dashboard']);
          } else {
            if (id.length === 5) {
              this.router.navigate(['/customer-page', id]);
            } else if (id.length === 6) {
              this.router.navigate(['/juristic-page', id]);
            } else {
              this.toastr.error('Invalid username or password', 'Login Failed');
            }
          }

          this.toastr.success('Login successful', 'Success');
        } else {
          this.toastr.error('Invalid username or password', 'Login Failed');
        }
      });
    }
  }

  loginWithGoogle() {
    console.log('Google login triggered');
    // Implement actual Google login logic here
  }

  loginWithFacebook() {
    console.log('Facebook login triggered');
    // Implement actual Facebook login logic here
  }

  signup() {
    this.router.navigate(['signup']);
  }
}
