import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import {
  CreditCard,
  CreditCardService,
} from '../../services/CreditCard.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private authService = inject(AuthService);
  private creditCardService = inject(CreditCardService);
  public username = environment.username;
  public password = environment.password;
  public creditCardList$!: Observable<CreditCard[]>;

  GetCreditCards() {
    this.creditCardList$ = this.creditCardService.getCreditCardList();
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        console.log('Login successful!');
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
