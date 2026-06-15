import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear user and underage flag on logout', () => {
    service.setSubmittedData({ name: 'Jan', surname: 'Kowalski', age: 22 });
    service.setUnderageBlocked(true);

    expect(service.getCurrentUser()).toBeNull();
    expect(service.consumeUnderageBlocked()).toBe(false);
  });
});
