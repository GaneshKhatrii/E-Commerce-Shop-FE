import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { IDashboard } from '../../models/dashboard-response.model';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private adminService = inject(AdminService);

  dashboardData = signal<IDashboard | null>(null);

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData() {
    this.adminService.getDashboardData().subscribe({
      next: (res: ApiResponse<IDashboard>) => {
        this.dashboardData.set(res.data);
        console.log(this.dashboardData());
      },
    });
  }
}
