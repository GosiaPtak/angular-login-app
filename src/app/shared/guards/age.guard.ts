import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const ageGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const user = loginService.getCurrentUser();

  let status: 'logged-in' | 'logged-out' | 'underage' = 'logged-out';

  if (user && Number(user.age) > 18) {
    loginService.setUnderageBlocked(false);
    status = 'logged-in';
  }

  if (user) {
    if (Number(user.age) <= 18) {
      loginService.setUnderageBlocked(true);
      status = 'underage';
    }
  } else {
    loginService.setUnderageBlocked(false);
  }

  return router.createUrlTree(
    ['/loginPage', { outlets: { status: ['auth-state'] } }],
    {
      fragment: 'auth-status',
      queryParams: { status }
    }
  );
};

