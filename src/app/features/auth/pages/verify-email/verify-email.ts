import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { SnackBar } from '../../../../core/services/snack-bar';
import { ApiResponse } from '../../../../core/models/api-response.model';

@Component({
  selector: 'app-verify-email',
  imports: [],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
})
export class VerifyEmail implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private snackBar = inject(SnackBar);
  private router = inject(Router);

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    if (token != null) {
      this.authService.verifyEmail(token).subscribe({
        next: (res: ApiResponse<null>) => {
          if (res.success) {
            this.snackBar.showNotification(res.message, 'success');
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.snackBar.showNotification(err.error.message, 'danger');
        },
      });
    } else {
      console.log('Token = ', token);
    }
  }
}
