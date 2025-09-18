import { Component } from '@angular/core';
import { CreditCardList } from './credit-card-list/credit-card-list';

@Component({
  selector: 'app-home',
  imports: [CreditCardList],
  templateUrl: './home.html',
})
export class Home {}
