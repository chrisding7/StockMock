import React, {useEffect, useState} from "react";
import MarketSearch from "./MarketSearch";
import MarketStock from "./MarketStock";

function Market({user}) {
    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${process.env.REACT_APP_API_KEY}`).then((res) => res.json()).then(companyData => {
            setCompanies(companyData)
            setIsLoading(false);
        })
    }, []);

    useEffect(() => {
        fetch(`/stocks`).then((res) => res.json()).then(stocksData => {
            setStocks(stocksData)
        })
    }, []);

    const results = companies.filter((company) => company.type === "Common Stock" && company.currency === "USD").map((company) => ({ticker: company.symbol, company: company.description}));

    const stocksDisplayed = results.filter((stock) => {
        return(stock.ticker.toLowerCase().includes(search.toLowerCase()) || (stock.company.toLowerCase().includes(search.toLowerCase())))
    });

    const renderMarketStocks = stocksDisplayed.sort().map((stock) => {
        return <MarketStock key={
                stock.ticker
            }
            user={
                user
            }
            stocks={
                stocks
            }
            ticker={
                stock.ticker
            }
            company={
                stock.company
            }/>
    })

    return (
        <div className="portfolio-container">
            <div className="market-container">
                <div className="market-header">
                    <h1 className="market-header-h1">Market</h1>
                    <h4 className="market-header-buying-power-h4">Buying power: ${
                        + (user.buying_power).toFixed(2)
                    } </h4>
                </div>
                <MarketSearch search={search}
                    setSearch={setSearch}/> {
                isLoading ? (
                    <p>Loading Market...</p>
                ) : (
                    <div className="market-stocks-list-container">
                        <ul className="market-stocks-list">
                            {renderMarketStocks} </ul>
                    </div>
                )
            } </div>
        </div>
    )
}

export default Market;
