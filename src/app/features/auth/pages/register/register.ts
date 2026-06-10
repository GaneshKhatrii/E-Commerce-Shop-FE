import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { SnackBar } from '../../../../core/services/snack-bar';
import { ApiResponse } from '../../../../core/models/api-response.model';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  private authService = inject(AuthService);
  private snackBar = inject(SnackBar);
  private fb = inject(FormBuilder);

  // Create RegisterForm
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (res: ApiResponse<string>) => {
        if (res.success) {
          this.snackBar.showNotification(res.message, 'success');
        }
      },
      error: (err) => {
        this.snackBar.showNotification(err.error.message, 'danger');
      },
    });
  }

  showErrors(property: string): string | null {
    const control = this.registerForm.get(property);

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

        case 'pattern':
          switch (property) {
            case 'firstName':
            case 'lastName':
              return 'Please enter valid alphabets only';
            case 'phoneNumber':
              return 'Please enter valid numbers only';
          }
          break;
        case 'minlength':
          switch (property) {
            case 'password':
              return 'Password must be atleast 6 characters';
            case 'phoneNumber':
              return `${property.charAt(0).toUpperCase() + property.slice(1)} must be atleast 10 characters`;
          }
          break;
        case 'maxlength':
          return 'Phone number cannot exceed 10 characters';
      }
    }
    return null;
  }
}
