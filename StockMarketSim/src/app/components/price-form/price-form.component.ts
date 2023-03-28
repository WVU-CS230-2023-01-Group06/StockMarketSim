import { Component } from '@angular/core';
import { GetPriceService } from '../../services/get-price.service';
import { getDatabase, ref, set, push } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css'],
})
export class PriceFormComponent {
  quoteLabel = '';
  priceLabel = '';
  stock: any;
  buyLabel = '';
  symbol = ' ';
  qty = 0;

  constructor(private api: GetPriceService, private router: Router) {}

  onQuoteSubmit() {
    this.api.giveSymbol(this.symbol);
    this.api.getPrice().subscribe((stock) => {
      if (Object.keys(stock).length == 0) {
        this.quoteLabel = 'STOCK NOT FOUND';
      } else {
        this.stock = JSON.parse(JSON.stringify(stock));
        this.quoteLabel = 'Quote Price: ' + this.stock[0].lastSalePrice;
      }
    });
  }

  onBuySubmit() {
    const db = getDatabase();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        this.router.navigate(['/']);
      }
    });
    const user = auth.currentUser;
    const transactionListRef = ref(db, 'transactions');
    const newBuyRef = push(transactionListRef);
    this.api.giveSymbol(this.symbol);
    this.api.getPrice().subscribe((stock) => {
      if (Object.keys(stock).length == 0) {
        this.buyLabel = 'STOCK NOT FOUND';
      } else {
        this.stock = JSON.parse(JSON.stringify(stock));
        set(newBuyRef, {
          uid: user?.uid,
          price: this.stock[0].lastSalePrice,
          symbol: this.symbol,
          timestamp: Date.now(),
          qty: this.qty,
        });
        this.priceLabel =
          'Bought ' +
          this.qty +
          ' shares of ' +
          this.symbol +
          ' for ' +
          this.qty * this.stock[0].lastSalePrice;
      }
    });
  }
}
