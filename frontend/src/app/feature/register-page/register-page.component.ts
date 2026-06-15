import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RegisterPageService } from './register-page.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegisterPageService]
})
export class RegisterPageComponent {
  readonly service = inject(RegisterPageService);
}
