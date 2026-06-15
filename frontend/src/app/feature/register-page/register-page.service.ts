import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class RegisterPageService {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  readonly isLoading = signal(false);
  readonly registerError = signal<string | null>(null);

  readonly formData = signal({
    username: '',
    password: '',
    name: '',
    surname: '',
    age: ''
  });

  readonly touched = signal(false);
  readonly usernameDirty = signal(false);
  readonly passwordDirty = signal(false);
  readonly submitted = signal(false);

  readonly errors = computed(() => {
    const { username, password, name, surname, age } = this.formData();
    return {
      username: username.trim() === '' ? ['required'] : [],
      password: password.trim() === '' ? ['required'] : [],
      name: this.getNameErrors(name),
      surname: this.getNameErrors(surname),
      age: this.getAgeErrors(age)
    };
  });

  readonly isValid = computed(() =>
    Object.values(this.errors()).every(e => e.length === 0)
  );

  updateField(field: 'username' | 'password' | 'name' | 'surname' | 'age', value: string): void {
    this.touched.set(true);
    field === 'username' && this.usernameDirty.set(true);
    field === 'password' && this.passwordDirty.set(true);
    this.registerError.set(null);
    this.formData.update(current => ({ ...current, [field]: value }));
  }

  register(): void {
    this.submitted.set(true);
    if (!this.isValid()) return;

    const { name, surname, age, username, password } = this.formData();

    if (Number(age) < 18) {
      this.router.navigate(['/underage']);
      return;
    }

    this.isLoading.set(true);
    this.http.post('/api/auth/register', { username, password }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/register-success']);
      },
      error: err => {
        this.registerError.set(
          err.status === 409 ? 'Username already taken.' : 'Registration failed. Please try again.'
        );
        this.isLoading.set(false);
      }
    });
  }

  private getNameErrors(value: string): string[] {
    if (value === '') return [];
    const errors: string[] = [];
    !/^[a-zA-Z ]*$/.test(value) && errors.push('pattern');
    !value.trim() && errors.push('required');
    return errors;
  }

  private getAgeErrors(value: string): string[] {
    if (value === '') return [];
    const errors: string[] = [];
    !/^[0-9]*$/.test(value) && errors.push('pattern');
    !value.trim() && errors.push('required');
    return errors;
  }
}
