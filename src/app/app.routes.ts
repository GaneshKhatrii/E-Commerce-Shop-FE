import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/layouts/auth-layout/auth-layout';
import { AuthRoutes } from './features/auth/auth-routes';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: AuthRoutes,
  },

  {
    path: '**',
    component: AuthLayout,
    children: AuthRoutes,
  },
];
