import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  [x: string]: any;
  loginForm: FormGroup;  // Declare the form group
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;  // State to toggle password visibility
  id: any;

  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminService ,private toastr: ToastrService) {
    // Initialize the form group with password fields and validators
    this.loginForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });  // Custom validator for password match

    let searchParams = new URLSearchParams(window.location.search);
    this.id = searchParams.get('id');
    if(!this.id){
      this.router.navigate(['/login']);
    }
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Method to toggle password visibility
  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }
  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Form Data:', formData);
      var data = {
        records: {
          'password': this.loginForm.value.password,
          'id': this.id
        }
      }
      this.adminService.post('/resetPassword', data).subscribe(res => {
        if (res.dataStatus) {
          this.router.navigate(['/login']);
          this.toastr.success('Password Reset Successfully', 'Success');
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
      // Add your login logic here, like calling an authentication service
    }
  }

}
