import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login-success',
  standalone: true,
  imports: [],
  template: `
    <div class="container mt-4">
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Logged in successfully!</h4>
        <p>You have successfully logged in.</p>
        <hr>
        <button class="btn btn-outline-success" (click)="logout()">Log Out</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginSuccessComponent {
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
