import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  imports: [MatPaginatorModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  // Column configuration
  @Input() columns: {
    label: string;
    key: string;
    isAction?: boolean;
  }[] = [];

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

  // Material pageNumber(pageIndex):  0,1,2,3...
  // API pageNumber:                  1,2,3,4...
  onPageChange(event: PageEvent) {
    this.pageChange.emit({
      pageIndex: event.pageIndex + 1,
      pageSize: event.pageSize,
    });
  }
}
