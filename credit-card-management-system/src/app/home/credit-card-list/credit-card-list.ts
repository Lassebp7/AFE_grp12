import { Component, computed, inject, signal } from '@angular/core';
import { CreditCardService } from '../../api-services/credit-card-service/credit-card-service';
import { CreditCardDetails } from './credit-card-item/credit-card-item/credit-card-details.component';
import { TransactionService } from '../../api-services/transaction-service/transaction-service';
import { CreditCard } from '../../models/credit-card';

@Component({
  selector: 'app-credit-card-list',
  imports: [CreditCardDetails],
  templateUrl: './credit-card-list.html',
})
export class CreditCardList {
  creditCardService = inject(CreditCardService);
  transactionService = inject(TransactionService);

  constructor() {
    this.get();
  }

  creditCards = signal<CreditCard[]>([]);
  transactions = signal<Transaction[]>([]);

  selectedView = signal<boolean>(false);
  selectedCard = signal<CreditCard | null>(null);
  selectedTransaction = computed(() =>
    this.transactions().filter((t) => t.cardNumber === this.selectedCard()?.cardNumber)
  );

  get() {
    this.creditCardService.getCreditCards().subscribe((data) => {
      this.creditCards.set(data);
    });
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions.set(data);
    });
  }

  handleSelectCard(card: CreditCard) {
    this.selectedCard.set(card);
    this.selectedView.set(true);
  }

  handleExitSelectView() {
    this.selectedCard.set(null);
    this.selectedView.set(false);
  }

  handleDeleteCard(card: CreditCard) {
    this.creditCardService.deleteCreditCard(card.cardNumber).subscribe({
      next: (response) => {
        console.log('Deleted card succesfully');
        this.creditCards.update((cards) => cards.filter((c) => c.cardNumber !== card.cardNumber));
        this.selectedCard.set(null);
        this.selectedView.set(false);
      },
      error: (error) => {
        console.log('Error deleting card:', error);
      },
    });
  }
}
