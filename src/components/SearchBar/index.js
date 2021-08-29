import React, { useMemo } from 'react';

import './SearchBar.css';

const SearchBar = ({
    searchText,
    list,
    keyword,
    suggestionsAmount,
    onSearchChange,
    onSuggestionClick,
}) => {
    const suggestions = useMemo(() => {
        if (!suggestionsAmount || !searchText) return;
        return list
            .filter(
                e =>
                    e[keyword]
                        ?.toLowerCase()
                        ?.includes(searchText.toLowerCase()) &&
                    e[keyword] !== searchText
            )
            .slice(0, suggestionsAmount);
    }, [keyword, list, searchText, suggestionsAmount]);

    return (
        <div className="searchbar-container">
            {suggestions?.length > 0 && (
                <ul className="searchbar-suggestions-container">
                    {suggestions.map((suggestion, i) => (
                        <li key={`${suggestion[keyword]}${i}`}>
                            <button
                                type="button"
                                onClick={() => onSuggestionClick(suggestion)}
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
