import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { PriceFormComponent } from './components/price-form/price-form.component';
import { TransactionHistoryComponent } from './layouts/transaction-history/transaction-history.component';
import { TutorialPageComponent } from './layouts/tutorial-page/tutorial-page.component';
import { UserPageComponent } from './layouts/user-page/user-page.component';
import { HomeTemplateComponent } from './pages/home-template/home-template.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
  },
  {
    path: 'CreateAccount',
    component: CreateAccountComponent,
  },
  {
    path: 'Homepage',
    component: HomeTemplateComponent,
    children: [
      {
        path: 'StockSearch',
        component: PriceFormComponent,
      },
      {
        path: 'TutorialPage',
        component: TutorialPageComponent,
      },
      {
        path: 'TransactionHistory',
        component: TransactionHistoryComponent,
      },
      {
        path: 'UserPage',
        component: UserPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
