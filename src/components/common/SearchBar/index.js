import Proptypes from "prop-types";

import styles from "./SearchBar.module.css";

const SearchBar = ({
  searchValue,
  suggestions,
  suggestionsAmount = 3,
  keyword,
  onSearchChange,
  onSuggestionClick,
}) => {
  return (
    <div className={styles.container}>
      {suggestions?.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.slice(0, suggestionsAmount).map((suggestion, i) => (
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
        className={styles.input}
        value={searchValue}
        onChange={onSearchChange}
      />
      <div className={styles.inputIcon}>
        <div className={styles.circle} />
        <div className={styles.rectangle} />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchValue: Proptypes.string,
  suggestions: Proptypes.array,
  suggestionsAmount: Proptypes.number,
  keyword: Proptypes.string.isRequired,
  onSearchChange: Proptypes.func.isRequired,
  onSuggestionClick: Proptypes.func,
};

export default SearchBar;
