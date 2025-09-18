import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AddCredit } from './add-credit/add-credit';
import { Transactions } from './transactions/transactions';
import { NotFound } from './not-found/not-found';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: Home,
    canActivate: [authGuard],
  },
  {
    title: 'Add Credit',
    path: 'add-credit',
    component: AddCredit,
    canActivate: [authGuard],
  },
  // Lazy loaded route
  {
    title: 'Transactions',
    path: 'transactions',
    loadComponent: () => import('./transactions/transactions').then((m) => m.Transactions),
    canActivate: [authGuard],
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
