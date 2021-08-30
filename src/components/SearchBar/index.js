import React from 'react';

import './SearchBar.css';

const SearchBar = ({
    searchText,
    suggestions,
    suggestionsAmount = 3,
    keyword,
    onSearchChange,
    onSuggestionClick,
}) => {
    return (
        <div className="searchbar-container">
            {suggestions?.length > 0 && (
                <ul className="searchbar-suggestions-container">
                    {suggestions
                        .slice(0, suggestionsAmount)
                        .map((suggestion, i) => (
                            <li key={`${suggestion[keyword]}${i}`}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        onSuggestionClick(suggestion)
                                    }
                                >
                                    {suggestion[keyword]}
                                </button>
                            </li>
                        ))}
                </ul>
            )}
            <input
                className="searchbar-input"
                value={searchText}
                onChange={onSearchChange}
            />
            <div className="searchbar-input-icon">
                <div className="circle" />
                <div className="rectangle" />
            </div>
        </div>
    );
};

export default SearchBar;
