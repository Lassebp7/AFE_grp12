import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreditCardService} from '../api-services/credit-card-service/credit-card-service';
import {CreditCard} from '../models/credit-card'

@Component({
  selector: 'app-add-credit',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-credit.html',
  styleUrl: './add-credit.css'
})
export class AddCredit {
  private creditCardService = inject(CreditCardService)

  creditCard: CreditCard = {
    cardHolderName: "",
    cardNumber: 0,
    cscCode: 0,
    expirationYear: 0,
    expirationMonth: 0,
    issuer: ""
  };

  creditCardForm = new FormGroup({
    cardNumber: new FormControl(this.creditCard.cardNumber, [
      Validators.required,
      Validators.min(1000000),
      Validators.max(9999999999999999),
      Validators.pattern(/^\d+$/)
    ]),
    cardHolderName: new FormControl(this.creditCard.cardHolderName, [
      Validators.required
    ]),
    cscCode: new FormControl(this.creditCard.cscCode, [
      Validators.required,
      Validators.pattern(/^\d{3}$/)
    ]),
    expirationMonth: new FormControl(this.creditCard.expirationMonth, [
      Validators.required,
      Validators.min(1),
      Validators.max(12),
      Validators.pattern(/^\d+$/)
    ]),
    expirationYear: new FormControl(this.creditCard.expirationYear, [
      Validators.required,
      Validators.pattern(/^\d+$/)
    ]),
    issuer: new FormControl(this.creditCard.issuer)
  })

  submit() {
    console.log("in submit")
    if (this.creditCardForm.invalid) {
      console.log("not valid form!")
      this.creditCardForm.markAllAsTouched();
      return;
    }

    const value = this.creditCardForm.value;
    const card: CreditCard = {
      cardNumber: Number(value.cardNumber ?? 0),
      cscCode: Number(value.cscCode ?? 0),
      cardHolderName: String(value.cardHolderName ?? ''),
      expirationMonth: Number(value.expirationMonth ?? 0),
      expirationYear: Number(value.expirationYear ?? 0),
      issuer: String(value.issuer ?? '')
    };

    this.creditCardService.postCreditCard(card).subscribe({
      next: () => {
        // Minimal success handling: reset the form
        this.creditCardForm.reset();
      },
      error: (err) => {
        console.error('Failed to submit credit card', err);
      }
    });
  }
}
