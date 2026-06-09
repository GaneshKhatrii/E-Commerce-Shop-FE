import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environment';
import { RegisterRequest } from '../models/register-request.model';
import { LoginRequest } from '../models/login-request.model';

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  register(request: RegisterRequest) {
    return this.http.post(`${this.baseUrl}/register`, request);
  }

  login(request: LoginRequest) {
    return this.http.post(`${this.baseUrl}/login`, request);
  }
}
