import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClarityModule } from '@clr/angular';

// Import child components
import { AlertComponent } from '../alert/alert.component';
import { LoadingButtonComponent } from '../loading-button/loading-button.component';
import { LoginHeaderComponent } from '../login-header/login-header.component';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ClarityModule,
    AlertComponent,
    LoadingButtonComponent,
    LoginHeaderComponent,
    FormFieldComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm: FormGroup;
  isLoading = false;
  loginError = '';

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';

      // Simulate login API call
      setTimeout(() => {
        const { username, password } = this.loginForm.value;
        
        if (username === 'admin' && password === 'password') {
          console.log('Login successful!', this.loginForm.value);
          window.location.href = 'http://localhost:4200';
        } else {
          this.loginError = 'Invalid username or password';
        }
        
        this.isLoading = false;
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
  }

  onRegister(): void {
    console.log('Register clicked');
  }

  onErrorClosed(): void {
    this.loginError = '';
  }
}