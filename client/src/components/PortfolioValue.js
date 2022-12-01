import React from "react";

function PortfolioValue({user, stocks}) {
    //PortfolioValue is the current market value of all user's stocks (requires api fetch) plus user's buying power

    const stockValues = stocks.map((stock) => stock.price * stock.quantity)

    const sumStockValues = stockValues.reduce((accumulator, value) => {
        return accumulator + value;
    }, 0)

    return (
        <div className="portfolio-value-container">

            <h2>Portfolio Value</h2>
            <h4>(This will become market stock price from api fetch + buying power)</h4>
            <h4>{user.buying_power + sumStockValues}</h4>
        </div>
    )
}

export default PortfolioValue
