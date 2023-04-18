import { Component } from '@angular/core';
import { GetPriceService } from '../../services/get-price.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';
import { GetBalanceService } from 'src/app/services/get-balance.service';
import { TransactionListService } from 'src/app/services/transaction-list.service';


// Authored by J.R. Hauser, jrhauser1127@gmail.com
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
  constructor(private priceApi: GetPriceService, private router: Router, private balanceDB: GetBalanceService, private transactionDB: TransactionListService) {}
  // Called when the user clicks the qoute button
  onQuoteSubmit() {
    //Give the symbol to the getprice service
    this.priceApi.giveSymbol(this.symbol.toLowerCase().trim());
    // Get the price from the getprice service
    this.priceApi.getPrice().subscribe((stock) => {
      // Check the response exists
      if (Object.keys(stock).length == 0) {
        //It doesn't exist
        this.quoteLabel = 'STOCK NOT FOUND';
      } else {
        // It exists
        // take the json response turn it into a string and then turn that into a JS 
                // object, store that object in this.stock
        this.stock = JSON.parse(JSON.stringify(stock));
        // print the price field from that object
        // (there is some abstraction there, email me if you have questions) 
        this.quoteLabel = 'Quote Price: ' + this.stock[0].lastSalePrice;
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
    this.priceApi.giveSymbol(this.symbol.toLowerCase().trim());
    this.priceApi.getPrice().subscribe(async (stock) => {
      //If the price API response is empty
      if (Object.keys(stock).length == 0) {
        this.priceLabel = 'STOCK NOT FOUND';
      } // the response exists
      else {
        // Tell the balance service which user to look for
        this.balanceDB.giveUid(this.uid);
        // Wait for the balance and set it
        this.balance =  await this.balanceDB.getBalance();
        // Parse the stock's price
        this.stock = JSON.parse(JSON.stringify(stock));
        // If the stock * qty is more than the balance
        if (this.stock[0].lastSalePrice * this.qty > this.balance) {
          this.priceLabel = 'Not enough money';
        } else {
          // otherwise set new balance
          var newBalance =
            this.balance - this.stock[0].lastSalePrice * this.qty;
          this.balanceDB.setBalance(newBalance);
          // Create new transaction in the database
          this.transactionDB.giveInfo(this.uid, this.stock[0].lastSalePrice,
                            this.symbol.toLowerCase().trim(), Date.now(), this.qty)
          // Set the label to show what was bought
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
