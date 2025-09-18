import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl

  getTransactions() {
    return this.http.get<Transaction[]>(`${this.baseUrl}/api/Transaction`)
  }

  postTransaction(transaction: Transaction) {
    return this.http.post<Transaction>(`${this.baseUrl}/api/Transaction`, transaction)
  }

  deleteTransactions(uid: string) {
    return this.http.delete(`${this.baseUrl}/api/Transaction/uid`, {
      params: { uid: uid }
    })
  }
}
