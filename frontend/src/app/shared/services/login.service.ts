import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const COOKIE_NAME = 'auth_token';
const TOKEN_MAX_AGE = 3600; // matches backend JWT expiry of 1h

function getCookie(name: string): string | null {
  const match = document.cookie.split('; ').find(row => row.startsWith(name + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function setCookie(name: string, value: string): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${TOKEN_MAX_AGE}; path=/; SameSite=Strict`;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; max-age=0; path=/; SameSite=Strict`;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly http = inject(HttpClient);
  private readonly _token = signal<string | null>(getCookie(COOKIE_NAME));

  readonly isLoggedIn = signal(!!getCookie(COOKIE_NAME));

  setToken(token: string): void {
    setCookie(COOKIE_NAME, token);
    this._token.set(token);
    this.isLoggedIn.set(true);
  }

  logout(): void {
    const token = this._token();
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      this.http.post('/api/auth/logout', {}, { headers }).subscribe({
        error: err => console.warn('Logout request failed:', err)
      });
    }
    deleteCookie(COOKIE_NAME);
    this._token.set(null);
    this.isLoggedIn.set(false);
  }
}
