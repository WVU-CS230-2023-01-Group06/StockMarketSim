export class PortfolioHistoryModel {
    price: number = 0;
    quantity: number = 0;
    total: number = 0;
    symbol: string = "STOCK";
    // date: string = "NOW";

    /**
     * Creates a new instance of the row.
     *
     * @param price - The price of the stock at the time of the transaction.
     * @param quantity - The amount of a stock that was bought or sold.
     * @param symbol - The symbol of the stock.
     * transaction occurred.
     */
    constructor(price: number, quantity: number, symbol: string) {
        
        this.price = Math.abs(price);
        this.quantity = quantity;
        this.symbol = symbol.toUpperCase();
        this.total = (price * quantity); //to be switched around a little (-)
    }

    /**
     * Converts the transaction's price as a string in US dollars.
     *
     * @returns This transaction's price formatted in US dollars.
     */
    get priceToString() {
        return this.price.toLocaleString(undefined, {
            style: "currency", currency: "USD"
        });
    }

    /**
     * Converts the transaction's total as a string in US dollars.
     *
     * @returns This transaction's total formatted in US dollars.
     */
    get totalToString() {
        return this.total.toLocaleString(undefined, {
            style: "currency", currency: "USD"
        });
    }
}