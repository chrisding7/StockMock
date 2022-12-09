import React from "react";

function MarketSearch({search, setSearch}) {

    function handleChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    return(
        <div>
                <input 
                    className="market-search-bar"
                    type="text"
                    placeholder="Search Companies"
                    value={search}
                    onChange={handleChange}/>
        </div>
    )
}

export default MarketSearch;