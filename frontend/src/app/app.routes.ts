import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'register' },
  {
    path: 'login',
    loadComponent: () => import('./feature/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'login-success',
    loadComponent: () => import('./feature/login-page/login-success.component').then(m => m.LoginSuccessComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./feature/register-page/register-page.component').then(m => m.RegisterPageComponent)
  },
  {
    path: 'register-success',
    loadComponent: () => import('./feature/register-page/register-success.component').then(m => m.RegisterSuccessComponent)
  },
  {
    path: 'underage',
    loadComponent: () => import('./shared/page-underage/underage.component').then(m => m.UndereageComponent)
  },
  { path: '**', loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) }
];
