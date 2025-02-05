import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm!: FormGroup;
  email: any;
  forgot_submitted: boolean = false

  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminService, private toastr: ToastrService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      // Logic to send the reset password link
      console.log('Reset link sent to:', email);
      // Call your service to send the reset link here
      var data ={
        records: {
          email: email,
          url: 'http://localhost:4200/password-mail'
        }
      }
      this.adminService.post('/forgotPassword', data).subscribe(res=>{
        if(res.dataStatus){
          this.toastr.success('Reset link sent successfully', 'Success');
          this.router.navigate(['/password-resert']);
        }
        else{
          this.toastr.error('Unable to find the email. Please enter the registered email.', 'Error');
        }
      })
    }
    else{
      this.toastr.warning('Please enter a valid email', 'Warning');
    }
  }

}
