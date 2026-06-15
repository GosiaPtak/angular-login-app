import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

@Injectable()
export class LoginPageService {
  private readonly ls = inject(LoginService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  readonly isLoading = signal(false);
  readonly loginError = signal<string | null>(null);

  readonly formData = signal({ username: '', password: '' });

  readonly touched = signal(false);
  readonly usernameDirty = signal(false);
  readonly passwordDirty = signal(false);
  readonly submitted = signal(false);

  readonly errors = computed(() => {
    const { username, password } = this.formData();
    return {
      username: username.trim() === '' ? ['required'] : [],
      password: password.trim() === '' ? ['required'] : []
    };
  });

  readonly isValid = computed(() =>
    Object.values(this.errors()).every(e => e.length === 0)
  );

  updateField(field: 'username' | 'password', value: string): void {
    this.touched.set(true);
    field === 'username' && this.usernameDirty.set(true);
    field === 'password' && this.passwordDirty.set(true);
    this.loginError.set(null);
    this.formData.update(current => ({ ...current, [field]: value }));
  }

  login(): void {
    this.submitted.set(true);
    if (!this.isValid()) return;

    const { username, password } = this.formData();
    this.isLoading.set(true);
    this.loginError.set(null);

    this.http.post<{ token: string }>('/api/auth/login', { username, password }).subscribe({
      next: ({ token }) => {
        this.ls.setToken(token);
        this.isLoading.set(false);
        this.router.navigate(['/login-success']);
      },
      error: () => {
        this.loginError.set('Invalid username or password.');
        this.isLoading.set(false);
      }
    });
  }
}
