import { Component, inject } from '@angular/core';
import { TransactionService } from '../api-services/transaction-service/transaction-service';

@Component({
  selector: 'app-add-transaction',
  imports: [],
  templateUrl: './add-transaction.html',
})
export class AddTransactionComponent {
  private transactionService = inject(TransactionService)

  transaction: Transaction = {
    uid: '',
    cardNumber: 0,
    amount: 0,
    currencyCode: '',
    transactionDate: '',
    comment: ''
  }


}
