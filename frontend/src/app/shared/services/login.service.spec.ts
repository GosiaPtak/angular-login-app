import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isLoggedIn to true when token is set', () => {
    service.setToken('test-token');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should clear isLoggedIn on logout', () => {
    service.setToken('test-token');
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
  });
});
