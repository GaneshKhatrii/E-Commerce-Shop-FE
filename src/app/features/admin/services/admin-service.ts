import { inject, Service } from '@angular/core';
import { environment } from '../../../../environment.prod';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../core/models/api-response.model';
import { IDashboard } from '../models/dashboard-response.model';
import { IUser } from '../models/users-response.model';
import { PagedResult } from '../../../core/models/paged-response.model';

@Service()
export class AdminService {
  baseUrl = `${environment.apiUrl}/admin`;

  private http = inject(HttpClient);

  getDashboardData() {
    return this.http.get<ApiResponse<IDashboard>>(`${this.baseUrl}/dashboard`);
  }

  getUsers(pageNumber: number, pageSize: number) {
    return this.http.get<ApiResponse<PagedResult<IUser>>>(
      `${this.baseUrl}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
  }
}
