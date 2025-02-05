import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  loginForm!: FormGroup;
  hidePassword: boolean = true;
  loginForm_submitted  :boolean = false


  constructor(private fb: FormBuilder, private router: Router,private adminService:AdminService,private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const data = {
  //       records: {
  //         email: this.loginForm.value.username,
  //         password: this.loginForm.value.password
  //       }
  //     };
  //     this.adminService.post('/Login', data).subscribe(res => {
  //       if (res.dataStatus) {
  //         localStorage.setItem('loginStatus', '1');
  //         this.router.navigate(['/dashboard']);
  //         this.toastr.success('Login successful', 'Success');
  //       } else {
  //         this.toastr.error('Invalid username or password', 'Login Failed');
  //       }
  //     });
  //   }
  // }

  customer(){
    this.router.navigate(['/customer-form'])

  }

  juristic(){
    this.router.navigate(['/juristic-form'])
  }

}
