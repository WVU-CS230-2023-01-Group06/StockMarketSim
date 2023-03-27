import { Component, OnInit, Input } from '@angular/core';
import { TransactionHistoryModel } from './transaction-history.model';
import { transaction_mock_list } from './transaction_mock_list';

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
