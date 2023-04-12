import { Injectable } from '@angular/core';
import { enviornment } from 'src/enviornments/enviorment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GetPriceService {
  private symbol = '';
  constructor(private http: HttpClient) {}

  giveSymbol(symbol: string) {
    this.symbol = symbol;
  }

  getPrice() {
    //TODO: NEED TO SETUP PROPER ENV VARIABLES INSTEAD OF HARD CODING THE API KEY
    let url =
      'https://cloud.iexapis.com/stable/tops?token=' + enviornment.PRICE_KEY +
      '&symbols=' +
      this.symbol;
    let price = this.http.get(url);
    return price;
  }
}
