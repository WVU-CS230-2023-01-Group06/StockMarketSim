export class TransactionHistoryModel {
    price: number;
    qty: number;
    symbol: string;
    timestamp: number;
    date: string;

    constructor(price: number, qty: number, symbol: string, timestamp: number) {
        this.price = price;
        this.qty = qty;
        this.symbol = symbol;
        this.timestamp = timestamp;
        this.date = new Date(timestamp).toLocaleString();
    }
}
