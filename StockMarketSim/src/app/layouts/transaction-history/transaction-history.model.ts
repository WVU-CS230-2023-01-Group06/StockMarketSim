export class TransactionHistoryModel {
    price: number = 0;
    qty: number = 0;
    total: number = 0;
    symbol: string = "STOCK";
    date: string = "NOW";

    constructor(price: number, qty: number, symbol: string, timestamp: number) {
        this.price = Math.abs(price);
        this.qty = qty;
        this.symbol = symbol.toUpperCase();
        this.date = new Date(timestamp).toLocaleString();
        this.total = price * qty;
    }

    get priceToString() {
        return this.price.toLocaleString(undefined, {
            style: "currency", currency: "USD"
        });
    }

    get totalToString() {
        return this.total.toLocaleString(undefined, {
            style: "currency", currency: "USD"
        });
    }
}
