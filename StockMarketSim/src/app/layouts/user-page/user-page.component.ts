import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
  stockTotals = new Map<string, number>();
  constructor(private router: Router) {}
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
        console.log(this.stockTotals);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
