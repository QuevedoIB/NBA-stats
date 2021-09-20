import React from 'react'
import Proptypes from 'prop-types'

import styles from './SearchBar.module.css'

const SearchBar = ({
  searchText,
  suggestions,
  suggestionsAmount = 3,
  keyword,
  onSearchChange,
  onSuggestionClick
}) => {
  return (
    <div className={styles.container}>
      {suggestions?.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions
            .slice(0, suggestionsAmount)
            .map((suggestion, i) => (
              <li key={`${suggestion[keyword]}${i}`}>
                <button
                  type='button'
                  onClick={() =>
                    onSuggestionClick(suggestion)}
                >
                  {suggestion[keyword]}
                </button>
              </li>
            ))}
        </ul>
      )}
      <input
        className={styles.input}
        value={searchText}
        onChange={onSearchChange}
      />
      <div className={styles.inputIcon}>
        <div className='circle' />
        <div className='rectangle' />
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  searchText: Proptypes.string,
  suggestions: Proptypes.array,
  suggestionsAmount: Proptypes.number,
  keyword: Proptypes.string.isRequired,
  onSearchChange: Proptypes.func.isRequired,
  onSuggestionClick: Proptypes.func
}

export default SearchBar
