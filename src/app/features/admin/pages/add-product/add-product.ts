import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { CommonAPIs } from '../../../../core/services/common-apis';
import { CategoryAndBrand } from '../../models/categoryAndBrand-response.model';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  private commonAPIs = inject(CommonAPIs);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.getProductCategories();
    this.getBrands();
    this.buildForm();
  }

  productInfoForm!: FormGroup;
  categories = signal<CategoryAndBrand[]>([]);
  brands = signal<CategoryAndBrand[]>([]);
  productId = signal<string>('');
  stepper = viewChild.required(MatStepper);

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

  onSaveProductInfo() {
    if (this.productInfoForm.invalid) {
      this.productInfoForm.markAllAsTouched();
      return;
    }

    console.log(this.productInfoForm.value);
    this.stepper().next();
  }
}
