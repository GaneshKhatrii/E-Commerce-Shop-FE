import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { CommonAPIs } from '../../../../core/services/common-apis';
import { CategoryAndBrand } from '../../models/categoryAndBrand-response.model';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin-service';
import { SnackBar } from '../../../../core/services/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct implements OnInit {
  // Services
  private commonAPIs = inject(CommonAPIs);
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private snackBar = inject(SnackBar);
  private activatedRoute = inject(ActivatedRoute);

  // Declarations
  productInfoForm!: FormGroup;
  categories = signal<CategoryAndBrand[]>([]);
  brands = signal<CategoryAndBrand[]>([]);
  productId = signal<string>('');
  stepper = viewChild.required(MatStepper);
  mode = signal<string>('');

  ngOnInit(): void {
    this.getProductCategories();
    this.getBrands();
    this.buildForm();
    this.mode.set(this.activatedRoute.snapshot.data['mode']);
    if (this.mode() === 'view') {
      this.productInfoForm.disable();
    }
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (productId && ['view', 'edit'].includes(this.mode())) {
      this.getProductById(productId);
    }
  }

  buildForm(): void {
    this.productInfoForm = this.fb.group({
      name: ['', Validators.required],
      brandId: ['', Validators.required],
      productCategoryId: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  getProductCategories() {
    this.commonAPIs.getProductCategories().subscribe((res: ApiResponse<CategoryAndBrand[]>) => {
      this.categories.set(res.data);
    });
  }
  getBrands() {
    this.commonAPIs.getBrands().subscribe((res: ApiResponse<CategoryAndBrand[]>) => {
      this.brands.set(res.data);
    });
  }

  getProductById(productId: string) {
    this.adminService.getProductById(productId).subscribe((res: ApiResponse<IProduct>) => {
      this.productInfoForm.patchValue(res.data);
    });
  }
  onSaveProductInfo() {
    if (this.mode() !== 'view') {
      if (this.productInfoForm.invalid) {
        this.productInfoForm.markAllAsTouched();
        return;
      }

      this.adminService.addProduct(this.productInfoForm.value).subscribe({
        next: (res: ApiResponse<string>) => {
          this.productId.set(res.data);
          this.snackBar.showNotification(res.message, 'success');
        },
      });
    }

    console.log(this.productInfoForm.value);
    this.stepper().next();
  }
}
