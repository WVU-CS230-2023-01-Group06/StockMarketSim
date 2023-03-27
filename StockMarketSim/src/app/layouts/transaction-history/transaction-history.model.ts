export class TransactionHistoryModel {
    date: string;
    stock: string;
    transaction: string;
    balance: string;

    constructor(date: string, stock: string, transaction: number, balance: number) {
        this.date = date;
        this.stock = stock;
        this.transaction = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", signDisplay: "always" }).format(transaction);
        this.balance = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(balance);
    }
}
