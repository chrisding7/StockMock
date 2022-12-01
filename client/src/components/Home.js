import React, { useState, useEffect } from "react";
import PortfolioValue from "./PortfolioValue";
import StockList from "./StockList";

function Home({user}) {
    const [stocks, setStocks] = useState([]);

    useEffect(()=> {
        fetch(`/users/${user.id}`)
        .then((res) => res.json())
        .then(userData => {
            setStocks(userData.stocks)
        })
      }, []);

    return (
        <div>
            <h1>Home</h1>
            <div className="homepage-buying-power">
                <h3>Buying power: {user.buying_power} </h3>
            </div>
            <div className="portfolio-container">
                <PortfolioValue user={user}  stocks={stocks}/>
                <StockList user={user} stocks={stocks}/>
            </div>
        </div>

    )
}

export default Home;
