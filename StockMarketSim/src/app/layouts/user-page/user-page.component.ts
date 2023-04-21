import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GetPriceService } from 'src/app/services/get-price.service';
import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  orderByKey,
  push,
  query,
  ref,
  set,
} from 'firebase/database';
import { GetBalanceService } from 'src/app/services/get-balance.service';
import { TransactionListService } from 'src/app/services/transaction-list.service';

//TODO: ADD SELL FUNCTIONALITY, DISPLAY USER BALANCE, FIELDS FOR DISPLAYING DATA, DATABINDING TO DISPLAY DATA
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {
  symbol = '';
  qty = 0;
  total: number = 0;
  stockTotals = new Map();
  balance: number = 0;
  stock: any;
  uid: any;
  sellLabel = '';

  constructor(private router: Router, private api: GetPriceService, private balanceDB: GetBalanceService,
                                                                private transactionDB: TransactionListService) {}
  async ngOnInit()  {
    const auth = getAuth();
    const db = getDatabase();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        const balanceRef = query(
          ref(db, 'usersBalance/'),
          orderByKey(),
          equalTo(user.uid)
        );
        await get(balanceRef).then((snapshot) => {
          snapshot.forEach((child) => {
            this.balance = child.val().balance
          })

        })
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
            this.api.getPrice().subscribe((stock) => {
              let resp =JSON.parse(JSON.stringify(stock));
              this.balance += resp[0].lastSalePrice
              this.balance = Math.round(this.balance * 100) / 100
            })
          } console.log(this.stockTotals)
        } else {
        this.router.navigate(['/']);
      }
    });
    
  }


  onSellSubmit() {
    const db = getDatabase();
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        this.router.navigate(['/']);
      }
    });
    this.api.giveSymbol(this.symbol.toLowerCase().trim());
    this.api.getPrice().subscribe(async (stock) => {
      if (Object.keys(stock).length == 0) {
        this.sellLabel = 'STOCK NOT FOUND';
      } else {
        this.stock = JSON.parse(JSON.stringify(stock));
        if (!this.stockTotals.has(this.symbol.toLowerCase().trim())) {
          this.sellLabel = 'you don\'t own that stock';
        }else if( this.qty > this.stockTotals.get(this.symbol.toLowerCase().trim())){
          this.sellLabel = 'you don\'t own that many of ' + this.symbol
        } else {
          var newBalance =
            this.balance + this.stock[0].lastSalePrice * this.qty;
          set(ref(db, 'usersBalance/' + this.uid), {
            balance: newBalance,
          });
          const transactionListRef = ref(db, 'transactions');
          const newSellRef = push(transactionListRef);
          set(newSellRef, {
            uid: this.uid,
            price: -this.stock[0].lastSalePrice,
            symbol: this.symbol.toLowerCase().trim(),
            timestamp: Date.now(),
            qty: -this.qty,
          });
          this.sellLabel =
            'Sold ' +
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