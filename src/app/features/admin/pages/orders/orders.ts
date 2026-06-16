import { Component, inject, OnInit, signal } from '@angular/core';
import { Table } from '../../../../shared/components/table/table';
import { IOrders } from '../../models/orders-list-response.model';
import { AdminService } from '../../services/admin-service';
import { map, tap } from 'rxjs';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { PagedResult } from '../../../../core/models/paged-response.model';
import { IColumns } from '../../../../core/models/table-column.model';
import { Router } from '@angular/router';
import { SnackBar } from '../../../../core/services/snack-bar';

@Component({
  selector: 'app-orders',
  imports: [Table],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  private adminService = inject(AdminService);
  private snackBar = inject(SnackBar);
  private router = inject(Router);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(10);
  totalRecords = signal<number>(0);

  ordersList = signal<IOrders[] | []>([]);

  columns: IColumns[] = [
    {
      label: 'Order Id',
      key: 'orderId',
    },
    {
      label: 'Customer Name',
      key: 'customerName',
    },
    {
      label: 'Customer Email',
      key: 'customerEmail',
    },
    {
      label: 'Phone Number',
      key: 'phoneNumber',
    },
    {
      label: 'Total Amount',
      key: 'totalAmount',
      pipe: 'currency',
    },
    {
      label: 'Status',
      key: 'status',
    },
    {
      label: 'Date',
      key: 'createdAt',
      pipe: 'date',
    },
    {
      label: 'Action',
      key: 'action',
      isAction: true,
    },
  ];

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.adminService
      .getOrders(this.pageNumber(), this.pageSize())
      .pipe(
        tap((res: ApiResponse<PagedResult<IOrders>>) =>
          this.totalRecords.set(res.data.totalRecords),
        ),
        map((res) => res.data.items),
        map((order: IOrders[]) =>
          order.map((res) => ({ ...res, id: res.orderId, name: res.customerName })),
        ),
      )
      .subscribe({
        next: (res: IOrders[]) => {
          this.ordersList.set(res);
        },
      });
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    this.pageNumber.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getOrders();
  }

  onRowChange(event: {
    actionType: 'view' | 'edit' | 'delete' | 'status-change';
    payload: { id: string; name: string; statusId?: number };
  }) {
    switch (event.actionType) {
      case 'view':
        this.router.navigate(['admin/orders', event.payload.id]);
        break;
      case 'status-change':
        if (event.payload.statusId) {
          this.changeStatus(event.payload.id, event.payload.statusId);
        }
    }
  }

  changeStatus(orderId: string, statusId: number) {
    this.adminService.updateStatus(orderId, statusId).subscribe({
      next: (res: ApiResponse<null>) => {
        this.snackBar.showNotification(res.message, 'success');
      },
    });
  }
}
