//authored by J.R. Hauser

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
  //get the symbol from the calling component
  giveSymbol(symbol: string) {
    this.symbol = symbol;
  }
  //get the lastSale price from the IEX cloud legacy API  https://iexcloud.io/docs/api/#quote returns the JSON object from the response
  getPrice() {
    let url =
      'https://cloud.iexapis.com/stable/tops?token=' +
      //enviornent set api key
      enviornment.PRICE_KEY +
      '&symbols=' +
      this.symbol;
    // return the object response from the API call
    let price = this.http.get(url);
    return price;
  }
}
