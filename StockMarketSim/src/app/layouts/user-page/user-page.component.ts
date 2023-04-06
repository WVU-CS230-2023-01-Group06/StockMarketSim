import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GetPriceService } from 'src/app/services/get-price.service';
import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from 'firebase/database';

//TODO: ADD SELL FUNCTIONALITY, DISPLAY USER BALANCE, FIELDS FOR DISPLAYING DATA, DATABINDING TO DISPLAY DATA
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {
  total: number = 0;
  stockTotals = new Map();
  balance: number = 0;
  constructor(private router: Router, private api: GetPriceService) {}
  async ngOnInit()  {
    const auth = getAuth();
    const db = getDatabase();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const transactionsRef = query(
          ref(db, 'transactions/'),
          orderByChild('uid'),
          equalTo(user.uid)
        );
        await get(transactionsRef)
          .then((snapshot) => {
            snapshot.forEach((child) => {
              let symbol = child.val().symbol;
              if (this.stockTotals.has(symbol)) {
                let oldQty = this.stockTotals.get(symbol);
                this.stockTotals.set(symbol, child.val().qty + oldQty);
              } else {
                this.stockTotals.set(symbol, child.val().qty);
              }
            });
          })
          .catch((error) => console.error(error));
          for await (let [key, value] of this.stockTotals) {
            this.api.giveSymbol(key);
            let stock;
            this.api.getPrice().subscribe((stock) => {
              let resp =JSON.parse(JSON.stringify(stock));
              this.balance += Number.parseFloat((Math.round(resp[0].lastSalePrice * 100) / 100).toFixed(2));

            })
          }
        } else {
        this.router.navigate(['/']);
      }
    });
    
  }
}