import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LoginService } from './../../shared/services/login.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  user: User;
  isAdult: boolean;
  constructor(public lg: LoginService, private router: Router) {}
  ngOnInit() {
    console.log('is adult', this.isAdult);
    this.lg.sharedUser === undefined
      ? this.router.navigateByUrl('/home')
      : this.lg.sharedUser.subscribe((user: User) => {
          this.user = { ...user };
        });
  }

  validateAge() {
    this.isAdult = Number(this.user.age) > 18 ? true : false;
    console.log(this.isAdult);
    return this.isAdult;
  }
}
