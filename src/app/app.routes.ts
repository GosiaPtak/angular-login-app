import { Routes } from '@angular/router';
import { ageGuard } from './shared/guards/age.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home',
    loadComponent: () => import('./core/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'loginPage',
    loadComponent: () => import('./feature/login-page/login-page.component').then(m => m.LoginPageComponent),
    children: [
      {
        path: 'auth-state',
        outlet: 'status',
        loadComponent: () => import('./shared/status/auth-status.component').then(m => m.AuthStatusComponent)
      }
    ]
  },
  { path: 'auth-check', canActivate: [ageGuard], loadComponent: () => import('./core/home/home.component').then(m => m.HomeComponent) },
  { path: '**', loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) }
];

