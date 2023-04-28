export class TransactionHistoryModel {
    price: number = 0;
    qty: number = 0;
    symbol: string = "STOCK";
    date: string = "NOW";

    constructor(price: number, qty: number, symbol: string, timestamp: number) {
        this.price = price;
        this.qty = Math.abs(qty);
        this.symbol = symbol.toUpperCase();
        this.date = new Date(timestamp).toLocaleString();
    }

    get priceToString() {
        return this.price.toLocaleString(undefined, {
            style: "currency", currency: "USD"
        });
    }
}
