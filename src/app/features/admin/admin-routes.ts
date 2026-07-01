import { Routes } from '@angular/router';

export const AdminRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((c) => c.Dashboard),
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders').then((c) => c.Orders),
  },
  {
    path: 'orders/:id',
    loadComponent: () => import('./pages/order-details/order-details').then((c) => c.OrderDetails),
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/products/products').then((c) => c.Products),
      },
      {
        path: 'add',
        loadComponent: () => import('./pages/add-product/add-product').then((c) => c.AddProduct),
      },
    ],
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users').then((c) => c.Users),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
