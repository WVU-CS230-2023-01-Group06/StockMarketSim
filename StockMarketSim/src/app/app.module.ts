import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { CarouselComponent } from './components/carousel/carousel.component';
import { NewsApiService } from './services/news-api.service';

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
    CarouselComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [NewsApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
