import { Injectable } from '@angular/core';
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
      'https://cloud.iexapis.com/stable/tops?token=pk_554abea8d34b4ec89301ea9beb841c6b&symbols=' +
      this.symbol;
    let price = this.http.get(url);
    return price;
  }
}
