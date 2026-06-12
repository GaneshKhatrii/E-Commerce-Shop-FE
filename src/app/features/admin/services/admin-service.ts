import { inject, Service } from '@angular/core';
import { environment } from '../../../../environment.prod';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../core/models/api-response.model';
import { IDashboard } from '../models/dashboard-response.model';

@Service()
export class AdminService {
  baseUrl = `${environment.apiUrl}/admin`;

  private http = inject(HttpClient);

  getDashboardData() {
    return this.http.get<ApiResponse<IDashboard>>(`${this.baseUrl}/dashboard`);
  }
}
