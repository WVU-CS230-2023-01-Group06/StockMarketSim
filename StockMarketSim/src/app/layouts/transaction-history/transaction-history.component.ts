import { Component, OnInit, Input } from '@angular/core';
import { TransactionHistoryModel } from './transaction-history.model';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { equalTo, get, getDatabase, orderByChild, ref, query } from 'firebase/database';
import { GetBalanceService } from 'src/app/services/get-balance.service';
import { TransactionSnapshot } from './transaction-snapshot';

@Component({
    selector: 'app-transaction-history',
    templateUrl: './transaction-history.component.html',
    styleUrls: ['./transaction-history.component.css'],
})
export class TransactionHistoryComponent implements OnInit {
    transactionTableRows: TransactionHistoryModel[] = [];
    userBalance: string = "$0.00";
    @Input() price: number;
    @Input() qty: number;
    @Input() symbol: string;
    @Input() date: string;

    constructor(private router: Router, private balanceDB: GetBalanceService) {
        this.price = 0.00;
        this.qty = 0;
        this.symbol = "STOCK";
        this.date = "";
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
                let uid: any = user.uid
                this.balanceDB.giveUid(uid);
                this.balanceDB.getBalance().then((balance) => {
                    this.userBalance = balance.toLocaleString(undefined, {
                        style: "currency", currency: "USD"
                    });
                });
            } else {
                this.router.navigate(['/']);
            }
        });
    }
}
