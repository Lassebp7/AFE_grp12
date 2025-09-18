import { Component, inject } from '@angular/core';
import { TransactionService } from '../api-services/transaction-service/transaction-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  transactionForm = new FormGroup({
    uid: new FormControl(this.transaction.uid, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]),
    cardNumber: new FormControl(this.transaction.cardNumber, [
      Validators.required,
      Validators.min(1)
    ]),
    amount: new FormControl(this.transaction.amount, [
      Validators.required,
      Validators.min(0)
    ]),
    currencyCode: new FormControl(this.transaction.currencyCode, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ]),
    comment: new FormControl(this.transaction.comment)
  })

  submit() {
    console.log("Submitting transaction")
    if (this.transactionForm.invalid) {
      console.log("Invalid form")
      this.transactionForm.markAllAsTouched()
      return
    }

    const value = this.transactionForm.value
    const transaction: Transaction = {
      uid: value.uid ?? '',
      cardNumber: value.cardNumber ?? 0,
      amount: value.amount ?? 0,
      currencyCode: value.currencyCode ?? '',
      transactionDate: new Date().toISOString(),
      comment: value.comment ?? ''
    }

    this.transactionService.postTransaction(transaction).subscribe({
      next: (response) => {
        console.log("Transaction added successfully", response)
        this.transactionForm.reset()
      },
      error: (error) => {
        console.log("Error adding transaction:", error)
      }
    })
  }
}
