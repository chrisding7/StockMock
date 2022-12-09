import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function MarketStock({user, stocks, ticker, company}) {
    const [showDetails, setShowDetails] = useState(false);
    const [buyQuantity, setBuyQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(0);
    const [loadingPrice, setLoadingPrice] = useState(true);
    const [thisStock, setThisStock] = useState(null);

    let navigate = useNavigate();
    let path = `/`;
    
    function handleView() {
        setShowDetails(!showDetails);
        fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.REACT_APP_API_KEY}`).then((res) => res.json()).then(stockData => {
            setStockPrice(+(stockData.c).toFixed(2))
            setLoadingPrice(false);
        });
        setThisStock(user.stocks.find(stock => stock.ticker === ticker));
    }   
   
    // buy functionality should include:
    // if user.stocks contains the ticker of this stock, UPDATE request for stock to modify price: stockPrice, quantity: quantity + buyQuantity
    // else CREATE request for a new Stock of user_id: user.id, company: company, ticker: ticker, price: stockPrice, quantity: buyQuantity
    // CREATE request for a new Transaction of :transaction_type: "buy", :transaction_price: buyQuantity * stockPrice
    // UPDATE request for User to modify :buying_power
    function handleBuy(e) {
        e.preventDefault();
        if (thisStock) {
            fetch(`/stocks/${thisStock.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        company: company,
                        ticker: ticker,
                        price: stockPrice,
                        quantity: (thisStock.quantity + buyQuantity),
                        user_id: user.id
                    }
                )
            }).then(res => res.json());

            fetch(`/transactions`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        user_id: user.id,
                        stock_id: thisStock.id,
                        transaction_type: "buy",
                        transaction_price: (stockPrice * buyQuantity)
                    }
                )
            }).then(res => res.json());

            fetch(`/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        password: user.password_digest,
                        password_confirmation: user.password_digest,
                        buying_power: (user.buying_power - (stockPrice * buyQuantity))
                    }
                )
            }).then(res => res.json());

        } else {
            fetch(`/stocks`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        company: company,
                        ticker: ticker,
                        price: stockPrice,
                        quantity: buyQuantity,
                        user_id: user.id
                    }
                )
            }).then(res => res.json()).then(data => {
                const stockId = data.id;

                return fetch(`/transactions`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            user_id: user.id,
                            stock_id: stockId,
                            transaction_type: "buy",
                            transaction_price: (stockPrice * buyQuantity)
                        }
                    )
                })
            }).then(res => res.json());

            fetch(`/users/${
                user.id
            }`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        password: user.password_digest,
                        password_confirmation: user.password_digest,
                        buying_power: (user.buying_power - (stockPrice * buyQuantity))
                    }
                )
            }).then(res => res.json());
        }
        navigate(path);
    }

    return (
        <div className="market-list-tile">
            <h2 className="market-ticker-text">
                {ticker}</h2>
            <p className="company-text">
                {company}</p>
            <div>
                <button className="market-stock-view-button"
                    onClick={
                        handleView
                }>{showDetails ? ("Hide") : ("View")}</button>

                {showDetails ? (<div className="buy-container">
                    {loadingPrice ? (<p>Loading Price...</p>) : (<h3 className="market-price-text">Price: ${stockPrice}</h3>)}
                            <form className="buy-quantity-form"
                                onSubmit={handleBuy}>
                                <input className="buy-quantity-input" type="text"
                                    value={buyQuantity}
                                    onChange={
                                        (e) => setBuyQuantity(e.target.value)
                                    }/>
                                <button type="submit" className="buy-button">Buy</button>
                            </form>
                        </div>) : (<div></div>)}
            </div>
        </div>
    )
}

export default MarketStock;
