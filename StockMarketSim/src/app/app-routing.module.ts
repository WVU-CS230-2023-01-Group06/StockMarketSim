import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LogInComponent } from './log-in/log-in.component';
import { PriceFormComponent } from './price-form/price-form.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent
   },
   {
    path: 'CreateAccount',
    component: CreateAccountComponent
   },
   {
    path: 'Homepage',
    component: UserPageComponent
   },
   {
    path: 'StockSearch',
    component:PriceFormComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
