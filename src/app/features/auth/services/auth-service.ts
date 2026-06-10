import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environment';
import { RegisterRequest } from '../models/register-request.model';
import { LoginRequest } from '../models/login-request.model';
import { ApiResponse } from '../../../core/models/api-response.model';
import { LoginResponse } from '../models/login-response.model';

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  register(request: RegisterRequest) {
    return this.http.post(`${this.baseUrl}/register`, request);
  }

  login(request: LoginRequest) {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, request);
  }
}
