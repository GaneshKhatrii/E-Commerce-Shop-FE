import { Component, inject, OnInit, signal } from '@angular/core';
import { Table } from '../../../../shared/components/table/table';
import { AdminService } from '../../services/admin-service';
import { map, tap } from 'rxjs';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { IUser } from '../../models/users-response.model';
import { PagedResult } from '../../../../core/models/paged-response.model';

@Component({
  selector: 'app-users',
  imports: [Table],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  private adminService = inject(AdminService);

  // Pagination properties
  pageNumber = signal<number>(1);
  pageSize = signal<number>(10);
  totalRecords = signal<number>(0);

  usersList = signal<IUser[] | []>([]);

  columns = [
    {
      label: 'Name',
      key: 'fullName',
    },
    {
      label: 'Email',
      key: 'email',
    },
    {
      label: 'Phone Number',
      key: 'phoneNumber',
    },
  ];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.adminService
      .getUsers(this.pageNumber(), this.pageSize())
      .pipe(
        // Use tap for side effects like setting the total count
        tap((res: ApiResponse<PagedResult<IUser>>) => this.totalRecords.set(res.data.totalRecords)),

        // Converting the response into direct list of users
        map((res) => res.data.items),

        // Creating full name property and passing on response including full name
        map((users: IUser[]) =>
          users.map((user: IUser) => ({
            ...user,
            fullName: `${user.firstName} ${user.lastName}`,
          })),
        ),
      )
      .subscribe({
        next: (res: IUser[]) => {
          this.usersList.set(res);

          console.log(this.totalRecords(), this.usersList());
        },
      });
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    this.pageNumber.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.getUsers();
  }
}
