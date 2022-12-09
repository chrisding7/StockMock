import React, {useState, useEffect} from "react";

function ProfileStock({
    ticker,
    price,
    quantity
}) {
    const [marketPrice, setMarketPrice] = useState(0);

    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.REACT_APP_API_KEY}`).then((res) => res.json()).then(stockData => {
            setMarketPrice(stockData.c)
        })
    }, []);

    const stockReturnRatio = +(((marketPrice - price) / price).toFixed(2));

    return (
        <div className="stock-list-tile">
                <h4 className="ticker-text">{ticker}</h4>
                <p className="shares-text">shares: {quantity}</p>
                <h4 className="stock-price-text">${marketPrice}</h4>
                {stockReturnRatio >= 0 ? (
                    <p className="stock-return-ratio-green">
                        +{stockReturnRatio}%</p>
                ) : (
                    <p className="stock-return-ratio-red">
                        {stockReturnRatio}%</p>
                )
            }
        </div>
    )
}

export default ProfileStock;
