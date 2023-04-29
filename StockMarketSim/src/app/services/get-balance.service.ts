//authored by: JR Hauser
import { Injectable } from '@angular/core';
import {
  equalTo,
  get,
  getDatabase,
  orderByKey,
  query,
  ref,
  set,
} from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class GetBalanceService {
  // Get database from firebase
  db = getDatabase();
  uid = 0;
  // Get UID from calling method
  giveUid(uid: number) {
    this.uid = uid;
  }

  //Get balance from firebase
  async getBalance() {
    // balance references
    const balanceRef = ref(this.db, 'usersBalance');
    // get a snapshot of the database with just the matching uid balance
    const snapshot = await get(
      query(balanceRef, orderByKey(), equalTo(this.uid))
    );
    // Get the balance from the database
    const balanceObj = <object>Object.values(snapshot.val())[0];
    const balance = Object.values(balanceObj)[0];
    return balance;
  }

  async setBalance(newBalance: number) {
    // Update the balance witht the new balance
    set(ref(this.db, 'usersBalance/' + this.uid), {
      balance: newBalance,
    });
  }
}
