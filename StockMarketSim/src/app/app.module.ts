import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PriceFormComponent } from './components/price-form/price-form.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { UserPageComponent } from './layouts/user-page/user-page.component';
import { TutorialPageComponent } from './layouts/tutorial-page/tutorial-page.component';
import { TransactionHistoryComponent } from './layouts/transaction-history/transaction-history.component';
import { HomeTemplateComponent } from './pages/home-template/home-template.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { BuyCarouselComponent } from './components/buy-carousel/buy-carousel.component';
import { SellCarouselComponent } from './components/sell-carousel/sell-carousel.component';
import { NewsApiService } from './services/news-api.service';
import { StockSearchLayoutComponent } from './layouts/stock-search-layout/stock-search-layout.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PriceFormComponent,
    LogInComponent,
    CreateAccountComponent,
    UserPageComponent,
    TutorialPageComponent,
    TransactionHistoryComponent,
    HomeTemplateComponent,
    LandingLayoutComponent,
    BuyCarouselComponent,
    SellCarouselComponent,
    StockSearchLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [NewsApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
