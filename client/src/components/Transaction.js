import React from "react";

function Transaction({transactionType, transactionPrice, stock}) {
    return(
        <div className="transaction-tile">
            <h4 className="ticker-text">{stock.ticker}</h4>
            <h4 className="stock-price-text">Total: ${transactionPrice.toFixed(2)}</h4>
            <p className="transaction-type-text">Type: {transactionType}</p>
            <p className="shares-text">Shares: {stock.quantity}</p>
        </div>
    )
}

export default Transaction