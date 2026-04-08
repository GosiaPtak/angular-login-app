import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: BehaviorSubject<User> | null = null;
  private underageBlocked = false;
  sharedUser;
  constructor() {}

  setSubmittedData(user: User) {
    this.user = new BehaviorSubject(user);
    this.sharedUser = this.user.asObservable();
  }

  getCurrentUser(): User | null {
    return this.user ? this.user.getValue() : null;
  }

  setUnderageBlocked(value: boolean): void {
    this.underageBlocked = value;
  }

  consumeUnderageBlocked(): boolean {
    const value = this.underageBlocked;
    this.underageBlocked = false;
    return value;
  }

  logout(): void {
    this.user = null;
    this.sharedUser = undefined;
    this.underageBlocked = false;
  }
}
