import { Component, OnInit, Input } from '@angular/core';
import { TransactionHistoryModel } from './transaction-history.model';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { equalTo, get, getDatabase, orderByChild, ref, query } from 'firebase/database';
import { GetBalanceService } from 'src/app/services/get-balance.service';
import { TransactionSnapshot } from './transaction-snapshot';

/**
 * Represents a user's transactions and their corresponding data in the
 * database.
 */
@Component({
    selector: 'app-transaction-history',
    templateUrl: './transaction-history.component.html',
    styleUrls: ['./transaction-history.component.css'],
})
export class TransactionHistoryComponent implements OnInit {
    // Represents all the rows in the transaction table.
    transactionTableRows: TransactionHistoryModel[] = [];
    userBalance: string = "$0.00";
    @Input() price: number;
    @Input() quantity: number;
    @Input() symbol: string;
    @Input() date: string;

    /**
     * Creates a new instance of the transaction history page.
     *
     * @param router - The router that loads the page.
     * @param balanceDB - The service for retrieving the user's balance.
     */
    constructor(private router: Router, private balanceDB: GetBalanceService) {
        this.price = 0.00;
        this.quantity = 0;
        this.symbol = "STOCK";
        this.date = "";
    }

    /**
     * Requests the user's transaction history and balance when the page loads.
     */
    ngOnInit() {
        const auth = getAuth();
        const db = getDatabase();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Only gets the transactions associated with the current user.
                const transactionsRef = query(
                    ref(db, 'transactions/'),
                    orderByChild('uid'),
                    equalTo(user.uid)
                );
                get(transactionsRef).then((snapshot) => {
                    snapshot.forEach((child) => {
                        // Convert each transaction in the database
                        // into a row in the transaction table.
                        const snap: TransactionSnapshot = child.val();
                        const transaction = new TransactionHistoryModel(
                            snap.price,
                            Math.abs(snap.qty),
                            snap.symbol.toUpperCase(),
                            snap.timestamp
                        );
                        this.transactionTableRows.push(transaction);
                    });
                })
                .catch((error) => console.error(error));
                // Only gets the balance associated with the current user.
                let uid: any = user.uid
                this.balanceDB.giveUid(uid);
                this.balanceDB.getBalance().then((balance) => {
                    // Stores the balance in US dollars as a string.
                    this.userBalance = balance.toLocaleString(undefined, {
                        style: "currency", currency: "USD"
                    });
                });
            } else {
                // Route back to the login page if no user is logged in.
                this.router.navigate(['/']);
            }
        });
    }
}
