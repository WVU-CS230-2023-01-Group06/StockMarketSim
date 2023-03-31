import { Component } from '@angular/core';
import { GetPriceService } from '../../services/get-price.service';
import {
  getDatabase,
  ref,
  set,
  push,
  query,
  Database,
  orderByChild,
  get,
  equalTo,
  orderByValue,
  orderByKey,
} from 'firebase/database';
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
  symbol = '';
  qty = 0;
  uid: any;
  balance = 0;
  constructor(private api: GetPriceService, private router: Router) {}

  onQuoteSubmit() {
    this.api.giveSymbol(this.symbol.toLowerCase().trim());
    this.api.getPrice().subscribe((stock) => {
      if (Object.keys(stock).length == 0) {
        this.quoteLabel = 'STOCK NOT FOUND';
      } else {
        this.stock = JSON.parse(JSON.stringify(stock));
        this.quoteLabel = 'Quote Price: ' + this.stock[0].lastSalePrice;
      }
    });
  }

  async onBuySubmit() {
    const db = getDatabase();
    const auth = getAuth();
    const balanceRef = ref(db, 'usersBalance');
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        this.router.navigate(['/']);
      }
    });
    this.api.giveSymbol(this.symbol);
    this.api.getPrice().subscribe(async (stock) => {
      if (Object.keys(stock).length == 0) {
        this.priceLabel = 'STOCK NOT FOUND';
      } else {
        const snapshot = await get(
          query(balanceRef, orderByKey(), equalTo(this.uid))
        );
        const balanceObj = <object>Object.values(snapshot.val())[0];
        this.balance = Object.values(balanceObj)[0];
        this.stock = JSON.parse(JSON.stringify(stock));
        if (this.stock[0].lastSalePrice * this.qty > this.balance) {
          this.priceLabel = 'Not enough money';
        } else {
          var newBalance =
            this.balance - this.stock[0].lastSalePrice * this.qty;
          console.log();
          set(ref(db, 'usersBalance/' + this.uid), {
            balance: newBalance,
          });

          const transactionListRef = ref(db, 'transactions');
          const newBuyRef = push(transactionListRef);

          set(newBuyRef, {
            uid: this.uid,
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
      }
    });
  }
}
