import React, {useState, useEffect} from "react";

function Stock({
    ticker,
    company,
    price,
    quantity,
    stock,
    user
}) {

    const [showSellQuantity, setShowSellQuantity] = useState(false);
    const [sellQuantity, setSellQuantity] = useState(quantity);
    const [marketPrice, setMarketPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.REACT_APP_API_KEY}`).then((res) => res.json()).then(stockData => {
            setMarketPrice(stockData.c)
        })
    }, []);
    
    const new_quantity = stock.quantity - sellQuantity;

    // sell functionality should include:
    // CREATE request for a new Transaction of :transaction_type: "sell", :transaction_price: quantity * stock price (api fetched)
    // UPDATE request for Stock to modify :quantity
    // UPDATE request for User to modify :buying_power
    function handleSell(e) {
        e.preventDefault();
        setShowSellQuantity(false);
        fetch("/transactions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    user_id: user.id,
                    stock_id: stock.id,
                    transaction_type: "sell",
                    transaction_price: (marketPrice * sellQuantity)
                }
            )
        }).then(res => res.json()).then(fetch(`/stocks/${
            stock.id
        }`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    user_id: user.id,
                    company: company,
                    ticker: ticker,
                    price: price,
                    quantity: new_quantity
                }
            )
        }).then(res => res.json())).then(data => {
            if (data.stock.quantity === 0) {
                fetch(`/transactions`).then(res => res.json()).then(data => {
                        const transactions = data;
                        console.log(transactions);
                        const filteredTransactions = transactions.filter(transaction => transaction.user.id === user.id && transaction.stock.id === stock.id);
                        console.log(filteredTransactions);
                        console.log(stock.id);
                        filteredTransactions.forEach(transaction => {
                             fetch(`/transactions/${transaction.id}`, {method: "DELETE"})
                        })
                    })          
            }
            })
            .then(fetch(`/users/${
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
                    buying_power: (user.buying_power + (marketPrice * sellQuantity))
                }
            )
        }).then(res => res.json()))

        setIsLoading(false);
    }

    const stockReturnRatio = +(((marketPrice - price) / price).toFixed(2));

    if (!isLoading) {
        window.location.reload();
    }

    return (
        <div className="stock-list-tile">
                <h4 className="ticker-text">{ticker}</h4>
                <p className="company-text">{company}</p>
                <p className="shares-text">Shares: {quantity}</p>
                <h4 className="stock-price-text">${marketPrice}</h4>
                {stockReturnRatio >= 0 ? (
                    <p className="stock-return-ratio-green">
                        +{stockReturnRatio}%</p>
                ) : (
                    <p className="stock-return-ratio-red">
                        {stockReturnRatio}%</p>
                )
            }
            <button className="sell-button" type="button"
                        onClick={
                            () => setShowSellQuantity(true)
                    }>Sell</button>

                    {showSellQuantity ? (
                        <div className="sell-quantity-container">
                            <form className="sell-quantity-form"
                                onSubmit={handleSell}>
                                <input className="sell-quantity-input" type="text"
                                    value={sellQuantity}
                                    onChange={
                                        (e) => setSellQuantity(e.target.value)
                                    }/>
                            </form>
                        </div>
                    ) : (
                        null
                    )
                }
            </div>
    )
}

export default Stock;
