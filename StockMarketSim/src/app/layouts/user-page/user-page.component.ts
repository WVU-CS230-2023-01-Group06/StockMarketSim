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

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {
  total: number = 0;
  allStocks: object[] = [];

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
              this.allStocks.push(child.val());
            });
          })
          .catch((error) => console.error(error));
        this.allStocks.forEach((stock) => {});
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
