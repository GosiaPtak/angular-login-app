import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  computed,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  isUnderageBlocked = false;
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
    const currentErrors = this.errors();
    return (
      currentErrors.name.length === 0 &&
      currentErrors.surname.length === 0 &&
      currentErrors.age.length === 0
    );
  });

  constructor(
    private ls: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isUnderageBlocked = this.ls.consumeUnderageBlocked();
    this.isLoggedIn.set(!!this.ls.getCurrentUser());
  }

  updateField(field: 'name' | 'surname' | 'age', value: string): void {
    this.touched.set(true);
    this.formData.update(current => ({
      ...current,
      [field]: value
    }));
  }

  login() {
    if (!this.isValid()) {
      return;
    }

    const { name, surname, age } = this.formData();
    this.ls.setUnderageBlocked(false);
    this.ls.setSubmittedData({
      name,
      surname,
      age: Number(age)
    });
    this.isLoggedIn.set(true);
    this.router.navigateByUrl('/auth-check');
  }

  logout(): void {
    this.ls.logout();
    this.isUnderageBlocked = false;
    this.isLoggedIn.set(false);
    this.touched.set(false);
    this.formData.set({ name: '', surname: '', age: '' });
    this.router.navigateByUrl('/auth-check');
  }


  private getNameErrors(value: string): string[] {
    if (value === '') {
      return [];
    }

    const errors: string[] = [];
    if (!/^[a-zA-Z ]*$/.test(value)) {
      errors.push('pattern');
    }
    if (!value.trim()) {
      errors.push('required');
    }

    return errors;
  }

  private getAgeErrors(value: string): string[] {
    if (value === '') {
      return [];
    }

    const errors: string[] = [];
    if (!/^[0-9]*$/.test(value)) {
      errors.push('pattern');
    }
    if (!value.trim()) {
      errors.push('required');
    }

    return errors;
  }
}
