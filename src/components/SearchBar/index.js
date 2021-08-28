import React, { useState, useMemo } from 'react';

import './SearchBar.css';

const SearchBar = ({ list, keyword, suggestionsAmount }) => {
    const [searchText, setSearchText] = useState('');

    const updateSearchValue = ({ target: { value } }) => {
        setSearchText(value);
    };

    const suggestions = useMemo(() => {
        if (!suggestionsAmount) return;
        return list
            .filter(e =>
                e[keyword]?.toLowerCase()?.includes(searchText.toLowerCase())
            )
            .slice(0, suggestionsAmount);
    }, [keyword, list, searchText, suggestionsAmount]);

    console.log(suggestions);
    return (
        <div className="searchbar-container">
            <input
                className="searchbar-input"
                value={searchText}
                onChange={updateSearchValue}
            />
            <div className="searchbar-input-icon">
                <div className="circle" />
                <div className="rectangle" />
            </div>
            {suggestionsAmount && <ul></ul>}
        </div>
    );
};

export default SearchBar;
