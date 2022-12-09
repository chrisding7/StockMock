import React, {useState, useEffect} from "react";
import Transaction from "./Transaction";

function MyProfile({user}) {
    const [showAddFunds, setShowAddFunds] = useState(false);
    const [addedFunds, setAddedFunds] = useState(10000);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch(`/transactions`).then((res) => res.json()).then(transactionData => {
            setTransactions(transactionData.filter(transaction => transaction.user.id === user.id))
        })
    }, []);

    console.log(transactions)

    function handleAddFunds() {
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
                    buying_power: (user.buying_power + parseInt(addedFunds))
                }
            )
        }).then(res => res.json())
        window.location.reload()
    }

    const renderTransactions = transactions.reverse().map((transaction) => {
        return (
            <Transaction key={
                    transaction.id
                }
                transactionType={
                    transaction.transaction_type
                }
                transactionPrice={
                    transaction.transaction_price
                }
                stock={
                    transaction.stock
                }/>
        )
    })

    return (
        <div>
            <div className="profile-container">
                <div className="purchase-history-container">
                    <div>
                        <h2 className="purchase-history-header">Transaction History</h2>
                        <button 
                            className="add-funds-button"
                            type="button"
                            onClick={
                                () => setShowAddFunds(true)
                        }>Add Funds</button>
                        {
                        showAddFunds ? (
                            <div className="sell-quantity-container">
                                <form className="sell-quantity-form"
                                    onSubmit={handleAddFunds}>
                                    <input className="sell-quantity-input" type="text"
                                        value={addedFunds}
                                        onChange={
                                            (e) => setAddedFunds(e.target.value)
                                        }/>
                                </form>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                        <h4 className="profile-buying-power-header">Buying power: ${+(user.buying_power).toFixed(2)}</h4> 
                    </div>
                    <div className="profile-transactions-container">
                        <ul className="profile-transactions-list">{renderTransactions}</ul>
                    </div>
                </div>
                <div className="profile-right-half">
                    <div className="profile-info-container">
                        <h4>{user.first_name} {user.last_name}</h4>
                        <p>{user.email}</p>
                    </div>
                    <div className="follows-box">
                        <h4>Followers: {
                            user.followers.length
                        } </h4>
                        <h4>Following: {
                            user.followings.length
                        } </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
