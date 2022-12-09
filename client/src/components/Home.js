import React, {useState, useEffect} from "react";
import StockList from "./StockList";

function Home({user}) {
    const [stocks, setStocks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/users/${
            user.id
        }`).then((res) => res.json()).then(userData => {
            setStocks(userData.stocks)}).then(setIsLoading(false))
    }, []);

    return (
            <div className="portfolio-container">
                {
                isLoading ? (
                    <p>Loading Portfolio...</p>
                ) : (
                    <div className="stocks-container">
                        <div className="stocks-header">
                            <h1 className="stocks-header-h1">Stocks</h1>
                            <h4 className="header-buying-power-h4">Buying power: ${+(user.buying_power).toFixed(2)}</h4>
                        </div>
                            
                        <div>
                            <StockList user={user}
                                stocks={stocks}/>
                        </div>
                    </div>
                )
            } </div>
    )
}

export default Home;
