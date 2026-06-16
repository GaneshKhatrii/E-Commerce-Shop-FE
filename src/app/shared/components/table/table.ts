import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { IColumns } from '../../../core/models/table-column.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OrderStatuses } from '../../../core/constants/order-status';

@Component({
  selector: 'app-table',
  imports: [MatPaginatorModule, DatePipe, CurrencyPipe, MatFormFieldModule, MatSelectModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  // Column configuration
  @Input() columns: IColumns[] = [];

  // Table data from parent
  @Input() data: any[] = [];

  // Pagination inputs
  @Input() totalRecords = 0;
  @Input() pageNumber = 0;
  @Input() pageSize = 0;

  // Emit page change to parent
  @Output() pageChange = new EventEmitter<{
    pageIndex: number;
    pageSize: number;
  }>();

  // importing order status constant
  orderStatuses = OrderStatuses;

  // Material pageNumber(pageIndex):  0,1,2,3...
  // API pageNumber:                  1,2,3,4...
  onPageChange(event: PageEvent) {
    this.pageChange.emit({
      pageIndex: event.pageIndex + 1,
      pageSize: event.pageSize,
    });
  }

  @Output() rowChange = new EventEmitter<{
    actionType: 'view' | 'edit' | 'delete' | 'status-change';
    payload: { id: string; name: string; statusId?: number };
  }>();

  onRowChange(
    id: string,
    name: string,
    actionType: 'view' | 'edit' | 'delete' | 'status-change',
    statusId?: number,
  ) {
    const event = {
      actionType,
      payload: { id, name, statusId },
    };

    this.rowChange.emit(event);
  }
}
