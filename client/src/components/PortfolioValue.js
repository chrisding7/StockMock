// import React from "react";

// function PortfolioValue({user, stocks, portfolioValue}) {
//     //PortfolioValue is the current market value of all user's stocks (requires api fetch) plus user's buying power
//     console.log(portfolioValue)

//     const stockValues = stocks.map((stock) => stock.price * stock.quantity)
//     const sumStockValues = stockValues.reduce((accumulator, value) => {
//         return accumulator + value;
//     }, 0)

//     const baseValue = user.buying_power + sumStockValues;
//     const currentValue = user.buying_power + portfolioValue;
//     const returnRatio = +((currentValue - baseValue) / baseValue).toFixed(2);

//     return (
//         <div className="portfolio-value-container">

//             <h2>Portfolio Value</h2>
//             <h4>${currentValue}</h4>
//             {
//                 returnRatio > 0 ? (
//                     <p className="stock-return-ratio-green">
//                         +{returnRatio}%</p>
//                 ) : (
//                     <p className="stock-return-ratio-red">
//                         {returnRatio}%</p>
//                 )
//             }
//             {/* <h4>{user.buying_power + sumStockValues}</h4> */}
//         </div>
//     )
// }

// export default PortfolioValue
