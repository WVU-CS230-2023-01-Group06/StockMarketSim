import { Component, OnInit, Input } from '@angular/core';
import { TransactionHistoryModel } from './transaction-history.model';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { child, equalTo, get, getDatabase, orderByChild, ref, query } from 'firebase/database';
@Component({
    selector: 'app-transaction-history',
    templateUrl: './transaction-history.component.html',
    styleUrls: ['./transaction-history.component.css'],
})
export class TransactionHistoryComponent implements OnInit {
    transactionTableRows: TransactionHistoryModel[] = [];
    @Input() price: number;
    @Input() qty: number;
    @Input() symbol: string;
    @Input() timestamp: number;
    //@Input() date: string;

    constructor(private router: Router) {
        this.price = 0.00;
        this.qty = 0;
        this.symbol = "STOCK";
        //this.date = "1/1/1970, 12:00:00 AM";
        this.timestamp = 0;
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
                        this.transactionTableRows.push(child.val());
                        //console.log(this.transactionTableRows.at(0)?.timestamp);
                    });
                })
                .catch((error) => console.error(error));
            } else {
                this.router.navigate(['/']);
            }
        });
    }
}
