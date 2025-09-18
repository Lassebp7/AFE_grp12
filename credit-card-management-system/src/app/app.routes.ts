import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AddCredit } from './add-credit/add-credit';
import { Transactions } from './transactions/transactions';
import { NotFound } from './not-found/not-found';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: Home,
  },
  {
    title: 'Add Credit',
    path: 'add-credit',
    component: AddCredit,
  },
  // Lazy loaded route
  {
    title: 'Transactions',
    path: 'transactions',
    loadComponent: () => import('./transactions/transactions').then((m) => m.Transactions),
  },
  {
    title: 'Login',
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotFound,
  },
];
