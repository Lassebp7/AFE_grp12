import { Routes } from '@angular/router';
import {Home} from './home/home';
import {AddCredit} from './add-credit/add-credit';
import {Transactions} from './transactions/transactions';
import {NotFound} from './not-found/not-found';

export const routes: Routes = [
  {
    title: "Home",
    path: "",
    component: Home,
  },
  {
    title: "Add Credit",
    path: "add-credit",
    component: AddCredit
  },
  {
    title: "Transactions",
    path: "transactions",
    component: Transactions
  },
  {
    path: "**",
    component: NotFound
  }
];
