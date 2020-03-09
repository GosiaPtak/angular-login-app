import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../../shared/services/login.service';
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit, OnDestroy {
  loginForm: FormGroup;
  valueChanges: any;

  constructor(
    private ls: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      name: [null],
      surname: [null],
      age: [null]
    });
  }

  ngOnInit() {
    this.onChanges();
  }
  onChanges() {
    this.valueChanges = this.loginForm.valueChanges.subscribe(val => {
      val.name === null || val.name === ''
        ? this.loginForm.controls.name.setValidators(null)
        : this.loginForm.controls.name.setValidators([
            Validators.pattern('[a-zA-Z ]*$'),
            Validators.required
          ]);

      val.surname === null || val.surname === ''
        ? this.loginForm.controls.surname.setValidators(null)
        : this.loginForm.controls.surname.setValidators([
            Validators.pattern('[a-zA-Z ]*$'),
            Validators.required
          ]);

      val.age === null || val.age === ''
        ? this.loginForm.controls.age.setValidators(null)
        : this.loginForm.controls.age.setValidators([
            Validators.pattern('^[0-9]*$'),
            Validators.required
          ]);
      this.loginForm.updateValueAndValidity({ emitEvent: false });
    });
    return this.valueChanges;
  }
  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    this.ls.setSubmittedData(this.loginForm.value);
    this.router.navigateByUrl('/page2');
  }
  ngOnDestroy() {
    this.valueChanges.unsubscribe();
  }
}
