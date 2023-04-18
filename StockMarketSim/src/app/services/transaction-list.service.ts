import { Injectable } from '@angular/core';
import { equalTo, get, getDatabase, orderByKey, push, query, ref, set } from 'firebase/database';


// Authored by J.R. Hauser, jrhauser1127@gmail.com
@Injectable({
  providedIn: 'root'
})
export class TransactionListService {
  //Get database from firebase
  db = getDatabase();
  // method to set new transaction
  giveInfo(uid: number, price: number, symbol: string, timestamp: number,  qty: number) {
    // get URL reference for the transactions
    const transactionListRef = ref(this.db, 'transactions');
    // Create a new transaction using push
    const newBuyRef = push(transactionListRef);
    // set the new transaction with the given info
    set(newBuyRef, {
      uid: uid,
      price: price,
      symbol: symbol.toLowerCase().trim(),
      timestamp: Date.now(),
      qty: qty,
    });
  }
}
