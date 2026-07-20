import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin-service';
import { IProduct, IProductsList } from '../../models/product.model';
import { Table } from '../../../../shared/components/table/table';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { IColumns } from '../../../../core/models/table-column.model';
import { map, tap } from 'rxjs';
import { PagedResult } from '../../../../core/models/paged-response.model';

@Component({
  selector: 'app-products',
  imports: [RouterLink, Table],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private adminService = inject(AdminService);
  private router = inject(Router);
  products = signal<IProductsList[] | []>([]);
  totalRecords = signal<number>(0);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(10);

  columns: IColumns[] = [
    {
      label: 'Image',
      key: 'image',
    },
    {
      label: 'Product Name',
      key: 'name',
    },
    {
      label: 'Category',
      key: 'categoryName',
    },
    {
      label: 'Brand Name',
      key: 'brandName',
    },
    {
      label: 'Description',
      key: 'description',
    },
    {
      label: 'Price',
      key: 'price',
    },
    {
      label: 'Stock',
      key: 'stock',
    },
    {
      label: 'Action',
      key: 'action',
      isAction: true,
    },
  ];
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.adminService
      .getProducts(this.pageNumber(), this.pageSize())
      .pipe(
        tap((res: ApiResponse<PagedResult<IProductsList>>) =>
          this.totalRecords.set(res.data.totalRecords),
        ),
        map((res) => res.data.items),
      )
      .subscribe({
        next: (res: IProductsList[]) => {
          this.products.set(res);
        },
      });
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    this.pageNumber.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getProducts();
  }

  onRowChange(event: {
    actionType: 'view' | 'edit' | 'delete' | 'status-change';
    payload: { id: string; name: string; statusId?: number };
  }) {
    switch (event.actionType) {
      case 'view':
        this.router.navigate(['admin/products/view', event.payload.id]);
        break;
      case 'edit':
        this.router.navigate(['admin/products', event.payload.id]);
        break;
    }
  }
}
