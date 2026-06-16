import { inject, Service } from '@angular/core';
import { environment } from '../../../../environment.prod';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../core/models/api-response.model';
import { IDashboard } from '../models/dashboard-response.model';
import { IUser } from '../models/users-response.model';
import { PagedResult } from '../../../core/models/paged-response.model';
import { IOrders } from '../models/orders-list-response.model';
import { IOrderDetails } from '../models/order-details-response.model';

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

  getOrders(pageNumber: number, pageSize: number) {
    return this.http.get<ApiResponse<PagedResult<IOrders>>>(
      `${this.baseUrl}/orders?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
  }

  getOrderDetails(id: string) {
    return this.http.get<ApiResponse<IOrderDetails>>(`${this.baseUrl}/orders/${id}`);
  }

  updateStatus(orderId: string, statusId: number) {
    return this.http.patch<ApiResponse<null>>(`${this.baseUrl}/orders/${orderId}/status`, {
      status: statusId,
    });
  }
}
