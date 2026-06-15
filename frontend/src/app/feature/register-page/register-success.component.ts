import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-success',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container mt-4">
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Registration successful!</h4>
        <p>You have registered successfully.</p>
        <hr>
        <p class="mb-0">
          <a routerLink="/login" class="alert-link">Go to login</a>
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterSuccessComponent {}
