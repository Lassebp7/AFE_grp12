import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CreditCard} from '../../models/credit-card';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl

  getCreditCards() {
    return this.http.get<CreditCard[]>(`${this.baseUrl}/api/CreditCard`)
  }

  postCreditCard(card: CreditCard) {
    return this.http.post<CreditCard>(`${this.baseUrl}/api/CreditCard`, card)
  }

  getCreditCard(cardNumber: number) {
    return this.http.get<CreditCard>(`${this.baseUrl}/api/CreditCard/cardnumber`,
      {
        params: {cardnumber: cardNumber}
      })
  }

  deleteCreditCard(cardNumber: number) {
    return this.http.delete<CreditCard>(`${this.baseUrl}/api/CreditCard/cardnumber`,
      {
        params: {cardnumber: cardNumber}
      })
  }
}
