import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private authService = inject(AuthService);
  public username = environment.username;
  public password = environment.password;

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
