import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.pattern('[a-zA-Z ]*')]],
      surname: ['', [Validators.pattern('[a-zA-Z ]*')]],
      age: ['', [Validators.pattern('^[0-9]*$')]]
    });
    this.onChanges();
  }
  onChanges() {
    this.loginForm.valueChanges.subscribe(val => {
      if (val.name || val.surname) {
        console.log('val', val.name);
      }
      // console.log(/\D/.exec(val));
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      console.log(this.loginForm);
      return;
    }
    this.router.navigateByUrl('/page2');
  }
}
