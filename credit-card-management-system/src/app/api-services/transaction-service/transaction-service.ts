import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl

  getTransactions() {
    return this.http.get<Transaction[]>(`${this.baseUrl}/api/Transaction`)
  }
}
