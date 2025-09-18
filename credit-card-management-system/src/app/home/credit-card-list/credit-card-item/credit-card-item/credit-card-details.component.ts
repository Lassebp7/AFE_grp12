import { Component, input } from '@angular/core';
import { CreditCard } from '../../../../models/credit-card';
import {ExpirationPipe} from '../../../../pipes/expiration-pipe';

@Component({
  selector: 'app-credit-card-details',
  imports: [ExpirationPipe],
  templateUrl: './credit-card-details.component.html',
})
export class CreditCardDetails {
  public creditCardInfo = input.required<CreditCard>();
  public transactions = input.required<Transaction[]>();
  protected readonly ExpirationPipe = ExpirationPipe;
}
