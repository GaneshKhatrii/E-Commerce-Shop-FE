import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { ActivatedRoute } from '@angular/router';
import { IOrderDetails } from '../../models/order-details-response.model';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { map } from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { environment } from '../../../../../environment.prod';

@Component({
  selector: 'app-order-details',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss',
})
export class OrderDetails implements OnInit {
  private adminService = inject(AdminService);
  private activatedRoute = inject(ActivatedRoute);

  orderDetails = signal<IOrderDetails | null>(null);

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.getOrderDetails(id);
    }
  }

  getOrderDetails(id: string) {
    this.adminService
      .getOrderDetails(id)
      .pipe(
        map((res: ApiResponse<IOrderDetails>) => res.data),
        map((order: IOrderDetails) => ({
          ...order,
          orderItems: order.orderItems.map((item) => ({
            ...item,
            imageUrl: `${environment.imageUrl}/${item.imageUrl}`,
          })),
        })),
      )
      .subscribe({
        next: (res) => {
          this.orderDetails.set(res);
        },
      });
  }
}
