import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-auth-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert mt-3" [ngClass]="alertClass()" role="status" id="auth-status">
      <a href="#auth-status" class="alert-link">
        {{ message() }}
      </a>
    </div>
  `
})
export class AuthStatusComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly queryParamMap = toSignal(this.route.queryParamMap);

  readonly status = computed(() => {
    const value = this.queryParamMap()?.get('status');
    if (value === 'logged-in' || value === 'underage' || value === 'logged-out') {
      return value;
    }
    return 'logged-out';
  });

  readonly message = computed(() => {
    if (this.status() === 'logged-in') {
      return 'You are logged in.';
    }
    if (this.status() === 'underage') {
      return 'You are underage and cannot log in.';
    }
    return 'You are logged out.';
  });

  readonly alertClass = computed(() => {
    if (this.status() === 'logged-in') {
      return 'alert-success';
    }
    if (this.status() === 'underage') {
      return 'alert-danger';
    }
    return 'alert-secondary';
  });
}

