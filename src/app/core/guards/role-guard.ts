import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginUserStateService } from '../state/login-user-state-service';
import { SnackBar } from '../services/snack-bar';

export const roleGuard: CanActivateFn = (route, state) => {
  const snackBar = inject(SnackBar);
  const router = inject(Router);
  const loginUserStateService = inject(LoginUserStateService);
  const currentRole = loginUserStateService.role();
  const requiredRole = route?.data['role'];
  console.log(currentRole);
  console.log(requiredRole);

  if (currentRole === requiredRole) {
    return true;
  }
  snackBar.showNotification('Access Denied', 'danger');
  router.navigate(['/auth/login']);
  return false;
};
