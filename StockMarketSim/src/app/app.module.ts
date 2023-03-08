import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PriceFormComponent } from './price-form/price-form.component';
import { LogInComponent } from './log-in/log-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserPageComponent } from './user-page/user-page.component';
import { TutorialPageComponent } from './tutorial-page/tutorial-page.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

@NgModule({
  declarations: [AppComponent, PriceFormComponent, LogInComponent, CreateAccountComponent, UserPageComponent
  , TutorialPageComponent, TransactionHistoryComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
