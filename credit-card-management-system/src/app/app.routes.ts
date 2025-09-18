import { Routes } from '@angular/router';
import {Home} from './home/home';
import {AddCredit} from './add-credit/add-credit';
import {Transactions} from './transactions/transactions';
import {NotFound} from './not-found/not-found';
import {authGuard} from './guards/auth-guard';

export const routes: Routes = [
  {
    title: "Home",
    path: "",
    component: Home,
    canActivateChild: [authGuard]
  },
  {
    title: "Add Credit",
    path: "add-credit",
    component: AddCredit,
    canActivateChild: [authGuard]
  },
  {
    title: "Transactions",
    path: "transactions",
    component: Transactions,
    canActivateChild: [authGuard]
  },
  {
    path: "**",
    component: NotFound
  }
];
