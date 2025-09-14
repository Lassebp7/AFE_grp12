import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddCreditCardComponent } from './pages/AddCreditCard/AddCreditCard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'add',
    component: AddCreditCardComponent,
  },
  // Lazy loaded route
  {
    path: 'transactions',
    loadComponent: () =>
      import('./pages/Transactions/Transactions.component').then(
        (m) => m.TransactionsComponent
      ),
  },
];
