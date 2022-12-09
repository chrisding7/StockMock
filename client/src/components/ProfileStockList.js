import React from "react";
import ProfileStock from "./ProfileStock";

function ProfileStockList({user, stocks}) {

    const renderStocks = stocks.map((oneStock) => {
        return (
            <ProfileStock key={
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

export default ProfileStockList
