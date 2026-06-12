import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginUserStateService } from '../../../core/state/login-user-state-service';
@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, MatSidenavModule, MatIcon, MatListModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
  private loginUserStateService = inject(LoginUserStateService);
  private router = inject(Router);
  logOut() {
    this.loginUserStateService.clearUser();
    this.router.navigate(['/auth/login']);
  }
}
