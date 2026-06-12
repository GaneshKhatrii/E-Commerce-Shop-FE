import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/layouts/auth-layout/auth-layout';
import { AuthRoutes } from './features/auth/auth-routes';
import { AdminLayout } from './layouts/layouts/admin-layout/admin-layout';
import { AdminRoutes } from './features/admin/admin-routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    component: AuthLayout,
    children: AuthRoutes,
  },

  {
    path: 'admin',
    component: AdminLayout,
    children: AdminRoutes,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
