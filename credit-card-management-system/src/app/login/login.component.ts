import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../api-services/auth-service/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);
  loginMessage: string = '';
  private router = inject(Router);
  username = '';
  password = '';

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.loginMessage = 'Login successful';
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loginMessage = `An error occured: ${err}`;
        console.error(err);
      },
    });
  }
  logout() {
    this.authService.logout();
  }
}
