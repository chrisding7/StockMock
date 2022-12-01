import React, {useState} from "react"; 

function Stock({ticker, company, price, quantity, stock, user}) {
    const [showSellQuantity, setShowSellQuantity] = useState(false);
    const [sellQuantity, setSellQuantity] = useState(quantity);

    const new_quantity = stock.quantity - sellQuantity;

    // sell functionality should inclue:
    // CREATE request for a new Transaction of :transaction_type: "sell", :transaction_price: quantity * stock price (api fetched)
    // UPDATE request for Stock to modify :quantity
    // UPDATE request for User to modify :buying_power
    function handleSell(e) {
        e.preventDefault();
        setShowSellQuantity(false);
        fetch("/transactions", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                user_id: user.id,
                stock_id: stock.id,
                transaction_type: "sell",
                transaction_price: (stock.price * sellQuantity)
            })
        }).then(res => res.json())
        .then(
            fetch(`/stocks/${stock.id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({
                    user_id: user.id,
                    company: company,
                    ticker: ticker,
                    price: price,
                    quantity: new_quantity
                })
            }).then(res => res.json())
        )
        .then(
            fetch(`/users/${user.id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    password_digest: user.password_digest,
                    buying_power: (user.buying_power + (stock.price * sellQuantity))
                })
            }).then(res => res.json())    
        )
        
         window.location.reload()
    }

    return (
        <div className="stock-list-tile">
            <div className="stock-list-tile-left-half">
                <h4 className="ticker-text">
                    {ticker}</h4>
                <p className="shares-text">shares: {quantity}</p>
            </div>
            <div className="stock-list-tile-right-half">
                <h4 className="stock-price-text">(api fetch for currentprice)</h4>
                <p className="stock-bought-price-text">bought at: {price}</p>
                <div>
                    <button className="sell-button" type="button"
                        onClick={
                            () => setShowSellQuantity(true)
                    }>Sell</button>

                    {
                    showSellQuantity ? (
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
                        <div></div>
                    )
                } </div>
            </div>
        </div>
    )
}

export default Stock;
