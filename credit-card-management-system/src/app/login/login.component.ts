import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
  isAuth = this.authService.isAuth;
  loginMessage = signal('');
  errorMessage = signal('');
  private router = inject(Router);
  username = '';
  password = '';

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.errorMessage.set('');
        this.loginMessage.set('Login successful');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      },
      error: (err) => {
        this.loginMessage.set('');
        this.errorMessage.set('An error occured during login.');
        console.error(err);
      },
    });
  }
  logout() {
    this.authService.logout();
    this.loginMessage.set('Successfully logged out.');
  }
}
