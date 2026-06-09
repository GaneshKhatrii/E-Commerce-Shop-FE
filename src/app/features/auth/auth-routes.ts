import { Routes } from '@angular/router';
export const AuthRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login').then((c) => c.Login),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((c) => c.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((c) => c.Register),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password').then((c) => c.ForgotPassword),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/login/login').then((c) => c.Login),
  },
];
