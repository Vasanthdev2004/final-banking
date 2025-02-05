import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  hidePassword: boolean = true;
  loginForm_submitted :boolean = false
  id: any;
  isEmail(id: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(id);
  }


  constructor(private fb: FormBuilder, private router: Router,private adminService:AdminService,private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
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
          localStorage.setItem('loginId', this.loginForm.value.username)
          console.log(this.loginForm.value.username, 'username');
  
          const id = this.loginForm.value.username;
          console.log('id:', id);
  
          const isEmail = this.isEmail(id);
          console.log('isEmail:', isEmail);
  
          if (isEmail) {
            // admin login
            console.log('admin login');
            this.router.navigate(['/dashboard']);
          } else {
            // customer or juristic person login
            console.log('customer or juristic person login');
            if (id.length === 5) {
              // customer login
              console.log('customer login');
              this.router.navigate(['/customer-page', id]);
            } else if (id.length === 6) {
              // juristic person login
              console.log('juristic person login');
              this.router.navigate(['/juristic-page', id]);
            } else {
              // invalid id length
              console.log('invalid id length');
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

  signup(){
    this.router.navigate(['signup'])
  }

}
