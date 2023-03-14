import { Component, ElementRef, ViewChild } from '@angular/core';
import { GetPriceService } from '../../services/get-price.service';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css'],
})
export class PriceFormComponent {
  priceLabel = ' ';
  stock: any;
  symbol = '';

  getSymbolInput(symbol: string) {
    this.symbol = symbol;
  }

  constructor(private api: GetPriceService) {}

  onClick() {
    this.api.giveSymbol(this.symbol);
    this.api.getPrice().subscribe((stock) => {
      if (Object.keys(stock).length == 0) {
        this.priceLabel = 'STOCK NOT FOUND';
      }
      this.stock = JSON.parse(JSON.stringify(stock));
      this.priceLabel = 'Price: ' + this.stock[0].bidPrice;
    });
  }
}
