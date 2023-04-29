// Authored by J.R. Hauser

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { StockSearchLayoutComponent } from './layouts/stock-search-layout/stock-search-layout.component';
import { TransactionHistoryComponent } from './layouts/transaction-history/transaction-history.component';
import { TutorialPageComponent } from './layouts/tutorial-page/tutorial-page.component';
import { UserPageComponent } from './layouts/user-page/user-page.component';
import { HomeTemplateComponent } from './pages/home-template/home-template.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';

// top level of the router
const routes: Routes = [
  {
    //log in page
    path: '',
    component: LogInComponent,
  },
  {
    //create account page
    path: 'CreateAccount',
    component: CreateAccountComponent,
  },
  {
    //homepage layout parent for sub routes to keep navbar at the top of the page
    path: 'Homepage',
    component: HomeTemplateComponent,
    children: [
      {
        //landing page with news articles
        path: '',
        component: LandingLayoutComponent,
      },
      {
        //page to get qoutes and buy stocks
        path: 'StockSearch',
        component: StockSearchLayoutComponent,
      },
      {
        // page for tutorial to teach users to use the website
        path: 'TutorialPage',
        component: TutorialPageComponent,
      },
      {
        //page to display users past transactions
        path: 'TransactionHistory',
        component: TransactionHistoryComponent,
      },
      {
        //display users portfolio stocks plus the total value of the stocks and cash balance
        path: 'UserPage',
        component: UserPageComponent,
      },
    ],
  },
];
//angular config
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
