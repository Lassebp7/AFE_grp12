import { Component, inject, signal } from '@angular/core';
import { TransactionService } from '../api-services/transaction-service/transaction-service';

@Component({
  selector: 'app-transactions',
  imports: [],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class Transactions {
  transactionService = inject(TransactionService)

  transactions = signal<Transaction[]>([])
  filteredTransactions = signal<Transaction[]>([])
  filterText = signal<string>('')

  constructor() {
    this.get()
  }

  get() {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions.set(data)
      this.filteredTransactions.set(data)
      console.log(data)
    })
  }

  handleDeleteTransaction(transaction: Transaction) {
    this.transactionService.deleteTransactions(transaction.uid)
      .subscribe({
        next: (response) => {
          console.log('Deleted transaction succesfully')
          this.transactions.update(transactions => transactions.filter(t => t.uid !== transaction.uid))
        },
        error: (error) => {
          console.log("Error deleting transaction:", error)
        }
      })
  }

  updateFilterText(event: any) {
    const text = event.target.value.toLowerCase()
    this.filterText.set(text)
    this.filteredTransactions.set(this.transactions().filter(t =>
      t.cardNumber.toString().toLowerCase().includes(text)
    ))
  }
}
