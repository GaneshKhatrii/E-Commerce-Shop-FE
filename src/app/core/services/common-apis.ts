import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environment';
import { CategoryAndBrand } from '../../features/admin/models/categoryAndBrand-response.model';
import { ApiResponse } from '../models/api-response.model';

@Service()
export class CommonAPIs {
  private http = inject(HttpClient);

  baseUrl: string = `${environment.apiUrl}/Product`;

  // Get PRODUCT Categories
  getProductCategories() {
    return this.http.get<ApiResponse<CategoryAndBrand[]>>(`${this.baseUrl}/get-categories`);
  }
  getBrands() {
    return this.http.get<ApiResponse<CategoryAndBrand[]>>(`${this.baseUrl}/get-brands`);
  }
}
