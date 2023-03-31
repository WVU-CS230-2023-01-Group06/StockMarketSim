<<<<<<< HEAD
import { Component, OnInit, Input } from '@angular/core';
import { TransactionHistoryModel } from './transaction-history.model';
import { transaction_mock_list } from './transaction_mock_list';

=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  child,
  equalTo,
  get,
  getDatabase,
  orderByChild,
  ref,
  query,
} from 'firebase/database';
//TODO: ADD FIELDS FOR THE DATA TO BE DISPLAYED, DISPLAY THE DATA WITH DATA BINDING
>>>>>>> 162cd1a (Added todo-comments)
@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit{
   @Input() date: string;
   @Input() stock: string;
   @Input() transaction: string;
   @Input() balance: string;

   transactionTableRows: TransactionHistoryModel[] = [];

   constructor() {
        this.date = "MM/DD/YYYY";
        this.stock = "STOCK";
        this.transaction = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", signDisplay: "always" }).format(-200);
        this.balance = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(850);

        for (var item of transaction_mock_list) {
            this.transactionTableRows.push({
                date: item.date,
                stock: item.stock,
                transaction: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", signDisplay: "always" }).format(item.transaction),
                balance: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.balance),
            });
        }
   }

   ngOnInit(): void {
       
   }
}
