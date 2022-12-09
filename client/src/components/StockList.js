import React from "react";
import Stock from "./Stock";

function StockList({user, stocks}) {
    
    const renderStocks = stocks.map((oneStock) => {

        return (
            <Stock key={
                    oneStock.id
                }
                ticker={
                    oneStock.ticker
                }
                company={
                    oneStock.company
                }
                price={
                    oneStock.price
                }
                quantity={
                    oneStock.quantity
                }
                stock={
                    oneStock
                }
                user={
                    user
                }
                stocks={
                    stocks
                }
                />
        )
    })

    return (
        <div className="portfolio-stocks-container">
            <ul className="stock-ul">
                {renderStocks}
            </ul>
        </div>
    )
}

export default StockList
