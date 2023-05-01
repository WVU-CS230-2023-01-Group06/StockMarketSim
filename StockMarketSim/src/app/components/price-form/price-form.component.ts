// Authored by J.R. Hauser

import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';
import { GetBalanceService } from 'src/app/services/get-balance.service';
import { TransactionListService } from 'src/app/services/transaction-list.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

//get-price.service.ts stopped working for some reason so I have hard coded the calls
// in the individual components this is not good code

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
  constructor(
    private router: Router,
    private balanceDB: GetBalanceService,
    private transactionDB: TransactionListService,
    private http: HttpClient
  ) {}
  // Called when the user clicks the qoute button
  onQuoteSubmit() {
    let url =
      'https://cloud.iexapis.com/stable/tops/last?symbols=' +
      this.symbol +
      '&token=' +
      //enviornent set api key
      environment.PRICE_KEY;

    let resp = this.http.get(url);
    resp.subscribe((stock) => {
      // Check the response exists
      if (Object.keys(stock).length == 0) {
        //It doesn't exist
        this.quoteLabel = 'STOCK NOT FOUND';
      } else {
        // It exists
        // take the json response turn it into a string and then turn that into a JS
        // object, store that object in this.stock
        this.stock = JSON.parse(JSON.stringify(stock))[0];
        // print the price field from that object
        // (there is some abstraction there, email me if you have questions)
        this.quoteLabel = 'Quote Price: ' + this.stock.price;
      }
    });
  }
  // When the user submits the buy form
  async onBuySubmit() {
    // Get auth from firebase
    const auth = getAuth();
    // From firebase documentation, reroute if the user isn't logged in
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //Set uid field to the user's uid
        this.uid = user.uid;
      } else {
        this.router.navigate(['/']);
      }
    });
    //get the price from the IEX API
    let url =
      'https://cloud.iexapis.com/stable/tops/last?symbols=' +
      this.symbol.toLowerCase().trim() +
      '&token=' +
      //enviornent set api key
      environment.PRICE_KEY;

    let price = this.http.get(url);
    price.subscribe(async (stock) => {
      // Check the response exists
      if (Object.keys(stock).length == 0) {
        //It doesn't exist
        this.quoteLabel = 'STOCK NOT FOUND';
      } else {
        // It exists
        // take the json response turn it into a string and then turn that into a JS
        // object, store that object in this.stock
        this.stock = JSON.parse(JSON.stringify(stock))[0];
        // print the price field from that object
        // (there is some abstraction there, email me if you have questions)
        // Tell the balance service which user to look for
        this.balanceDB.giveUid(this.uid);
        // Wait for the balance and set it to the local balance
        this.balance = await this.balanceDB.getBalance();
        // If the stock * qty is more than the balance
        if (this.stock.price * this.qty > this.balance) {
          this.priceLabel = 'Not enough money';
        } else {
          // otherwise set new balance
          var newBalance = this.balance - this.stock.price * this.qty;
          this.balanceDB.setBalance(newBalance);
          // Create new transaction in the database
          this.transactionDB.giveInfo(
            this.uid,
            this.stock.price,
            this.symbol.toLowerCase().trim(),
            Date.now(),
            this.qty
          );
          // Set the label to show what was bought
          this.priceLabel =
            'Bought ' +
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
