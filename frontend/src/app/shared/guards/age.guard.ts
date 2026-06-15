import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const ageGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const user = loginService.getCurrentUser();
  const hasUser = !!user;
  const isAdult = hasUser && Number(user.age) > 18;
  const isUnderage = hasUser && Number(user.age) <= 18;

  let status: 'logged-in' | 'logged-out' | 'underage' = 'logged-out';

  isAdult && loginService.setUnderageBlocked(false);
  isAdult && (status = 'logged-in');

  isUnderage && loginService.setUnderageBlocked(true);
  isUnderage && (status = 'underage');

  !hasUser && loginService.setUnderageBlocked(false);

  return router.createUrlTree(
    ['/login', { outlets: { status: ['auth-state'] } }],
    {
      fragment: 'auth-status',
      queryParams: { status }
    }
  );
};

