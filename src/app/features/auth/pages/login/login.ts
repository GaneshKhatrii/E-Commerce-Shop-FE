import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { SnackBar } from '../../../../core/services/snack-bar';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { LoginResponse } from '../../models/login-response.model';
import { LoginUserStateService } from '../../../../core/state/login-user-state-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private authService = inject(AuthService);
  private snackBar = inject(SnackBar);
  private fb = inject(FormBuilder);
  private loginUserStateService = inject(LoginUserStateService);
  private router = inject(Router);

  // Create FormGroup or form name
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (response: ApiResponse<LoginResponse>) => {
        if (response.success) {
          this.snackBar.showNotification(response.message, 'success');
          this.router.navigate(['/admin/dashboard']);
        }
        this.loginUserStateService.setUser(response.data);
      },
      error: (err) => {
        this.snackBar.showNotification(err.error.message, 'danger');
      },
    });
  }

  showErrors(property: string): string | null {
    const control = this.loginForm.get(property);

    if (control && control.invalid && (control.touched || control.dirty)) {
      const errors = control.errors || {};

      // Get the first error from the errors list
      const error = Object.keys(errors)[0];

      switch (error) {
        case 'required':
          // Capitalizes the first letter and appends the rest of the string
          return `${property.charAt(0).toUpperCase() + property.slice(1)} is required`;

        case 'email':
          return `Enter valid email id`;

        case 'minlength':
          switch (property) {
            case 'password':
              return 'Password must be atleast 6 characters';
          }
      }
    }
    return null;
  }
}
