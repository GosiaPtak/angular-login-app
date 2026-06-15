import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LoginPageService } from './login-page.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginPageService]
})
export class LoginPageComponent {
  readonly service = inject(LoginPageService);
}
