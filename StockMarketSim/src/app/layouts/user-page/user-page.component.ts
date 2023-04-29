// Authored by J.R. Hauser
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

//TODO: DISPLAY USER BALANCE, FIELDS FOR DISPLAYING DATA, DATABINDING TO DISPLAY DATA

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {
  //initialize variables for displaying data
  symbol = '';
  qty = 0;
  total: number = 0;
  stockTotals = new Map();
  balance: number = 0;
  stock: any;
  uid: any;
  sellLabel = '';

  constructor(
    private router: Router,
    private api: GetPriceService,
    private balanceDB: GetBalanceService,
    private transactionDB: TransactionListService
  ) {}
  async ngOnInit() {
    const auth = getAuth();
    const db = getDatabase();
    //Check there is a user signed in or reroute them to the login page
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //get the user id
        this.uid = user.uid;
        //ask the database for the balance of that user id
        const balanceRef = query(
          ref(db, 'usersBalance/'),
          orderByKey(),
          equalTo(user.uid)
        );
        await get(balanceRef).then((snapshot) => {
          //this for each only runs once
          snapshot.forEach((child) => {
            //set users balance to the local balance
            this.balance = child.val().balance;
          });
        });
        //ask the database for the transactions that match the user's id
        const transactionsRef = query(
          ref(db, 'transactions/'),
          orderByChild('uid'),
          equalTo(user.uid)
        );
        await get(transactionsRef)
          .then((snapshot) => {
            //loop through the transactions
            snapshot.forEach((child) => {
              let symbol = child.val().symbol;
              //if the stock total map has the symbol update the qty
              if (this.stockTotals.has(symbol)) {
                let oldQty = this.stockTotals.get(symbol);
                this.stockTotals.set(symbol, child.val().qty + oldQty);
                //the stock total map does not have the symbol add it to the qty
              } else {
                this.stockTotals.set(symbol, child.val().qty);
              }
              //delete the symbol from the map if the qty is 0
              if (this.stockTotals.get(symbol) == 0) {
                this.stockTotals.delete(symbol);
              }
            });
          })
          //catch the get error
          .catch((error) => console.error(error));
        //this took me forever to get an async loop but now it looks up the price for each stock in the map
        for await (let [key] of this.stockTotals) {
          this.api.giveSymbol(key);
          this.api.getPrice().subscribe((stock) => {
            //parse the response from IEX
            let resp = JSON.parse(JSON.stringify(stock));
            //add the response to the balance
            this.balance += resp[0].lastSalePrice;
            //add to the balance and round to two decimals
            this.balance = Math.round(this.balance * 100) / 100;
          });
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  onSellSubmit() {
    const db = getDatabase();
    const auth = getAuth();
    //Check there is a user signed in or reroute them to the login page
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        this.router.navigate(['/']);
      }
    });
    //give the trimmed lowercase symbol to the getpriceservice to retrive the price from the IEX api
    this.api.giveSymbol(this.symbol.toLowerCase().trim());
    this.api.getPrice().subscribe(async (stock) => {
      //if the response is empty the stock wasn't found
      if (Object.keys(stock).length == 0) {
        this.sellLabel = 'STOCK NOT FOUND';
      } else {
        //parse the response to get the stock object
        this.stock = JSON.parse(JSON.stringify(stock));
        //if the stockTotals map doesn't have the symbol tell the user
        if (!this.stockTotals.has(this.symbol.toLowerCase().trim())) {
          this.sellLabel = "you don't own that stock";
          //if the stockTotals map maps the symbol to a qty higher than the given qty, tell the user
        } else if (
          this.qty > this.stockTotals.get(this.symbol.toLowerCase().trim())
        ) {
          this.sellLabel = "you don't own that many of " + this.symbol;
        } else {
          //update the balance in the database
          this.balanceDB.giveUid(this.uid);
          // Wait for the balance and set it to the local balance
          let newBalance = await this.balanceDB.getBalance();
          //update balance
          newBalance += this.stock[0].lastSalePrice * this.qty;
          //set new balance
          this.balanceDB.setBalance(newBalance);

          //set new sell in transaction list in the database
          const transactionListRef = ref(db, 'transactions');
          const newSellRef = push(transactionListRef);
          set(newSellRef, {
            uid: this.uid,
            price: -this.stock[0].lastSalePrice,
            symbol: this.symbol.toLowerCase().trim(),
            timestamp: Date.now(),
            qty: -this.qty,
          });
          //tell the user they sold the stock
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
