import { Component, OnInit, Input } from '@angular/core';
import { TransactionHistoryModel } from './transaction-history.model';
import { transaction_mock_list } from './transaction_mock_list';
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
@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
})
export class TransactionHistoryComponent {

  
  transactionTableRows: TransactionHistoryModel[] = [];
  @Input() date: string;
  @Input() stock: string;
  @Input() transaction: string;
  @Input() balance: string;
  constructor(private router: Router) {
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
  ngOnInit() {
    const auth = getAuth();
    const db = getDatabase();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const transactionsRef = query(
          ref(db, 'transactions/'),
          orderByChild('uid'),
          equalTo(user.uid)
        );
        get(transactionsRef)
          .then((snapshot) => {
            snapshot.forEach((child) => {
              console.log(child.val());
            });
          })
          .catch((error) => console.error(error));
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
