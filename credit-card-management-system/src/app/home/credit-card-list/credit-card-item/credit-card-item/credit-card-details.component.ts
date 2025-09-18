import {Component, input} from '@angular/core';
import {CreditCard} from '../../../../models/credit-card';

@Component({
  selector: 'app-credit-card-details',
  imports: [],
  templateUrl: './credit-card-details.component.html',
  styleUrl: './credit-card-details.component.css'
})
export class CreditCardDetails {
  public creditCardInfo = input.required<CreditCard>();
  public transactions = input.required<Transaction[]>();
}
