import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { TransactionService } from '../api-services/transaction-service/transaction-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditCardService } from '../api-services/credit-card-service/credit-card-service';
import { CreditCard } from '../models/credit-card';

@Component({
  selector: 'app-add-transaction',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-transaction.html',
})
export class AddTransactionComponent {
  private transactionService = inject(TransactionService)
  private creditCardService = inject(CreditCardService)

  creditCards = signal<CreditCard[]>([])

  @Output() transactionAdded = new EventEmitter<Transaction>();

  constructor() {
    this.getCreditCards()
  }

  getCreditCards() {
    this.creditCardService.getCreditCards().subscribe(data => {
      this.creditCards.set(data)
    })
  }

  transaction: Transaction = {
    uid: '',
    cardNumber: 0,
    amount: 0,
    currencyCode: '',
    transactionDate: '',
    comment: ''
  }

  transactionForm = new FormGroup({
    cardNumber: new FormControl(this.transaction.cardNumber, [
      Validators.required,
    ]),
    amount: new FormControl(this.transaction.amount, [
      Validators.required,
      Validators.min(0),
    ]),
    currencyCode: new FormControl(this.transaction.currencyCode, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ]),
    comment: new FormControl(this.transaction.comment, [
      Validators.maxLength(200)
    ])
  })

  submit() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched()
      return
    }

    const value = this.transactionForm.value
    const transaction: Transaction = {
      uid: '',
      cardNumber: value.cardNumber ?? 0,
      amount: value.amount ?? 0,
      currencyCode: value.currencyCode ?? '',
      transactionDate: new Date().toISOString(),
      comment: value.comment ?? ''
    }

    this.transactionService.postTransaction(transaction).subscribe({
      next: (response) => {
        this.transactionAdded.emit(transaction)
        this.transactionForm.reset()
      },
      error: (error) => {
        console.error("Error adding transaction:", error)
      }
    })
  }
}
