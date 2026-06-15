import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-underage',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container mt-4">
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Registration not allowed</h4>
        <p>You are underage and cannot register.</p>
        <hr>
        <p class="mb-0">
          <a routerLink="/login" class="alert-link">Go to login</a>
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UndereageComponent {}
