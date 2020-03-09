import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: BehaviorSubject<User>;
  sharedUser;
  constructor() {}

  setSubmittedData(user: User) {
    this.user = new BehaviorSubject(user);
    this.sharedUser = this.user.asObservable();
  }
}
