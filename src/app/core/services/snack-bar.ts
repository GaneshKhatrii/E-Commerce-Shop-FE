import { inject, Service } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export type notificationType = 'success' | 'danger' | 'warning' | 'info';

@Service()
export class SnackBar {
  private matSnackBar = inject(MatSnackBar);

  showNotification(message: string, type: notificationType = 'success') {
    this.matSnackBar.open(message, 'close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`notification-${type}`],
    });
  }
}
