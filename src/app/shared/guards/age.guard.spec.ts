import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { ageGuard } from './age.guard';
import { LoginService } from '../services/login.service';

describe('ageGuard', () => {
  let loginService: LoginService;
  let router: Router;

  const executeGuard = () =>
    TestBed.runInInjectionContext(() => ageGuard({} as any, {} as any));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        LoginService
      ]
    });
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('should redirect to /loginPage when no user is set', () => {
    const result = executeGuard();
    expect(result).toEqual(
      router.createUrlTree(
        ['/loginPage', { outlets: { status: ['auth-state'] } }],
        {
          fragment: 'auth-status',
          queryParams: { status: 'logged-out' }
        }
      )
    );
    expect(loginService.consumeUnderageBlocked()).toBe(false);
  });

  it('should redirect to /loginPage when user is 18 or younger', () => {
    loginService.setSubmittedData({ name: 'Jan', surname: 'Kowalski', age: 18 });
    const result = executeGuard();
    expect(result).toEqual(
      router.createUrlTree(
        ['/loginPage', { outlets: { status: ['auth-state'] } }],
        {
          fragment: 'auth-status',
          queryParams: { status: 'underage' }
        }
      )
    );
    expect(loginService.consumeUnderageBlocked()).toBe(true);
  });

  it('should redirect to /loginPage with logged-in status when user is older than 18', () => {
    loginService.setSubmittedData({ name: 'Jan', surname: 'Kowalski', age: 19 });
    const result = executeGuard();
    expect(result).toEqual(
      router.createUrlTree(
        ['/loginPage', { outlets: { status: ['auth-state'] } }],
        {
          fragment: 'auth-status',
          queryParams: { status: 'logged-in' }
        }
      )
    );
    expect(loginService.consumeUnderageBlocked()).toBe(false);
  });
});

