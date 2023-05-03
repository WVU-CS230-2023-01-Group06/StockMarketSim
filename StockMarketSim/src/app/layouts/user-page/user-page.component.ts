// Authored by J.R. Hauser
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PortfolioHistoryModel } from './user-page.model';

//TODO: DISPLAY USER BALANCE, FIELDS FOR DISPLAYING DATA, DATABINDING TO DISPLAY DATA

//get-price.service.ts stopped working for some reason so I have hard coded the calls
// in the individual components this is not good code

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit{
  //initialize variables for displaying data
  symbol = '';
  qty = 0;
  total: number = 0;
  stockTotals = new Map();
  balance: number = 0;
  cashBalance: number = 0;
  stock: any;
  uid: any;
  sellLabel = '';
 
  quantity: number;
  price: number;
  symbol01: string;


  constructor(
    private router: Router,
    private balanceDB: GetBalanceService,
    private transactionDB: TransactionListService,
    private http: HttpClient
) 
{
  this.price = 0.00;
  this.quantity = 0;
  this.symbol01 = "STOCK";
  

}
  async ngOnInit() {
    const auth = getAuth();
    const db = getDatabase();
    //Check there is a user signed in or reroute them to the login page
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //get the user id
        this.uid = user.uid;
        this.balanceDB.giveUid(this.uid);
        //ask the database for the balance of that user id
        this.balance = await this.balanceDB.getBalance();
        this.cashBalance =  Math.round(this.balance * 100) / 100;
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
          let url =
            'https://cloud.iexapis.com/stable/tops/last?symbols=' +
            key +
            '&token=' +
            //enviornent set api key
            environment.PRICE_KEY;

          
          let resp = this.http.get(url);
          resp.subscribe((stock) => {
            //parse the response from IEX
            let price = JSON.parse(JSON.stringify(stock))[0].price;
            //add the response to the balance
            this.balance += price * this.stockTotals.get(key);
            //add to the balance and round to two decimals
            this.balance = Math.round(this.balance * 100) / 100;
            console.log(this.stockTotals);
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
    let url =
      'https://cloud.iexapis.com/stable/tops/last?symbols=' +
      this.symbol.toLowerCase().trim() +
      '&token=' +
      //enviornent set api key
      environment.PRICE_KEY;
    let resp = this.http.get(url);
    resp.subscribe(async (stock) => {
      //if the response is empty the stock wasn't found
      if (Object.keys(stock).length == 0) {
        this.sellLabel = 'STOCK NOT FOUND';
      } else {
        //parse the response to get the stock object
        this.stock = JSON.parse(JSON.stringify(stock))[0];
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
          newBalance += this.stock.price * this.qty;
          //set new balance
          this.balanceDB.setBalance(newBalance);

          //set new sell in transaction list in the database
          const transactionListRef = ref(db, 'transactions');
          const newSellRef = push(transactionListRef);
          set(newSellRef, {
            uid: this.uid,
            price: -this.stock.price,
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
            this.qty * this.stock.price;
        }
      }
    });
  }
}
