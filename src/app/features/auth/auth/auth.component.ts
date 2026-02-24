import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm!: FormGroup;
  isLoginMode = true; 
  isLoading = false;
  errorMessage = ''; // 👈 बॅकएंडचे एरर्स दाखवण्यासाठी (उदा. "Email already exists")

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService // 👈 Service Inject केली
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe(params => {
    if (params['token'] && params['user']) {
      // टोकन आणि युजर डेटा लोकलस्टोरेजमध्ये सेव्ह करणे
      localStorage.setItem('token', params['token']);
      localStorage.setItem('user', decodeURIComponent(params['user']));
      
      // ॲपला सांगणे की युजर लॉगिन झालाय
      this.authService.currentUserSubject.next(JSON.parse(decodeURIComponent(params['user'])));
      
      console.log('Google Login Successful!');
      this.router.navigate(['/']); // होम पेजवर पाठवणे
    }
  });
  }

  initForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [''] 
    });
    this.updateNameValidation();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = ''; // मोड बदलताना एरर गायब करणे
    this.authForm.reset();
    this.updateNameValidation();
  }

  updateNameValidation() {
    const nameControl = this.authForm.get('name');
    if (!this.isLoginMode) {
      nameControl?.setValidators([Validators.required]);
    } else {
      nameControl?.clearValidators();
    }
    nameControl?.updateValueAndValidity();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.authForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  // 🚀 The Magic: Submission to Backend
  onSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const formData = this.authForm.value;

    if (this.isLoginMode) {
      // 🟢 LOGIN API
      this.authService.login({ email: formData.email, password: formData.password }).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log('Login Success!', res);
          this.router.navigate(['/']); // लॉगिन झाल्यावर होम पेजवर पाठवणे
        },
        error: (err) => {
          this.isLoading = false;
          // बॅकएंडने दिलेला एरर दाखवणे (उदा. "Invalid Email or Password")
          this.errorMessage = err.error.message || 'Login failed. Please try again.';
        }
      });
    } else {
      // 🔵 REGISTER API
     // 🔵 REGISTER API
      this.authService.register({ name: formData.name, email: formData.email, password: formData.password }).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log('Registration Success!', res);
          this.router.navigate(['/']); 
        },
        error: (err) => {
          this.isLoading = false;
          
          // 🔴 हे लाईन ॲड कर म्हणजे खरा प्रॉब्लेम कळून जाईल:
          console.error('🔥 BACKEND ERROR:', err); 

          // err.error?.message मुळे ॲप क्रॅश होणार नाही
          this.errorMessage = err.error?.message || 'Registration failed. Check console for details.';
        }
      });
    }
  }

// क्लासच्या सुरुवातीला हे व्हेरिएबल ॲड कर
isForgotPasswordMode = false;
forgotPasswordSuccess = false;

// 1. Toggle Forgot Password Mode
toggleForgotPassword() {
  this.isForgotPasswordMode = !this.isForgotPasswordMode;
  this.errorMessage = '';
  this.forgotPasswordSuccess = false;
  this.authForm.reset();
}

// 2. Forgot Password Submit
onForgotPasswordSubmit() {
  const emailControl = this.authForm.get('email');
  if (emailControl?.invalid) {
    emailControl.markAsTouched();
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  this.authService.forgotPassword(emailControl?.value).subscribe({
    next: (res) => {
      this.isLoading = false;
      this.forgotPasswordSuccess = true; // सक्सेस मेसेज दाखवण्यासाठी
    },
    error: (err) => {
      this.isLoading = false;
      this.errorMessage = err.error?.message || 'Failed to send reset link.';
    }
  });
}

// 3. Social Logins (Google & Twitter)
// auth.component.ts

loginWithGoogle() {
  this.isLoading = true;
  // थेट बॅकएंडच्या राऊटवर पाठवा, तो आपोआप गुगलच्या लॉगिन पेजवर रिडिरेक्ट करेल
  // window.location.href = 'http://localhost:5000/api/users/google';
  window.location.href = 'https://vicharmanch-backend.onrender.com/api/users/google';
}

loginWithTwitter() {
  this.isLoading = true;
  // window.location.href = 'http://localhost:5000/api/users/twitter';
  window.location.href = 'https://vicharmanch-backend.onrender.com/api/users/twitter';
}
}