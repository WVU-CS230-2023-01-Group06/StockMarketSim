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

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
})
export class TransactionHistoryComponent {
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
              console.log(child.val().symbol);
            });
          })
          .catch((error) => console.error(error));
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
