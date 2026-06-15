import { Injectable, computed, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

@Injectable()
export class LoginPageService {
  private readonly ls = inject(LoginService);
  private readonly router = inject(Router);

  readonly isUnderageBlocked = signal(false);
  readonly isLoggedIn = signal(false);

  readonly formData = signal({
    name: '',
    surname: '',
    age: ''
  });

  readonly touched = signal(false);

  readonly errors = computed(() => {
    const { name, surname, age } = this.formData();
    return {
      name: this.getNameErrors(name),
      surname: this.getNameErrors(surname),
      age: this.getAgeErrors(age)
    };
  });

  readonly isValid = computed(() => {
    const { name, surname, age } = this.errors();
    return name.length === 0 && surname.length === 0 && age.length === 0;
  });

  init(): void {
    this.isUnderageBlocked.set(this.ls.consumeUnderageBlocked());
    this.isLoggedIn.set(!!this.ls.getCurrentUser());
  }

  updateField(field: 'name' | 'surname' | 'age', value: string): void {
    this.touched.set(true);
    this.formData.update(current => ({ ...current, [field]: value }));
  }

  login(): void {
    if (!this.isValid()) {
      return;
    }
    const { name, surname, age } = this.formData();
    this.ls.setUnderageBlocked(false);
    this.ls.setSubmittedData({ name, surname, age: Number(age) });
    this.isLoggedIn.set(true);
    this.router.navigateByUrl('/auth-check');
  }

  logout(): void {
    this.ls.logout();
    this.isUnderageBlocked.set(false);
    this.isLoggedIn.set(false);
    this.touched.set(false);
    this.formData.set({ name: '', surname: '', age: '' });
    this.router.navigateByUrl('/auth-check');
  }

  private getNameErrors(value: string): string[] {
    if (value === '') { return []; }
    const errors: string[] = [];
    !/^[a-zA-Z ]*$/.test(value) && errors.push('pattern');
    !value.trim() && errors.push('required');
    return errors;
  }

  private getAgeErrors(value: string): string[] {
    if (value === '') { return []; }
    const errors: string[] = [];
    !/^[0-9]*$/.test(value) && errors.push('pattern');
    !value.trim() && errors.push('required');
    return errors;
  }
}

