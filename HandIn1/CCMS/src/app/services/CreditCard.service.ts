import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface CreditCard {
  cardNumber: number;
  cscCode: number;
  cardHolderName: string;
  expirationMonth: number;
  expirationYear: number;
  issuer: string;
}

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getCreditCardList() {
    return this.http.get<CreditCard[]>(`${this.baseUrl}/api/CreditCard`);
  }

  postCreditCard(creditCard: CreditCard) {
    return this.http.post(`${this.baseUrl}/api/CreditCard`, creditCard);
  }

  getCreditCardByNumber(cardNumber: number) {
    const params = new HttpParams().set('cardnumber', cardNumber);
    return this.http.get<CreditCard>(
      `${this.baseUrl}/api/CreditCard/cardnumber`,
      { params }
    );
  }

  deleteCreditCardByNumber(cardNumber: number) {
    const params = new HttpParams().set('cardnumber', cardNumber);
    return this.http.delete<CreditCard>(
      `${this.baseUrl}/api/CreditCard/cardnumber`,
      { params }
    );
  }
}
