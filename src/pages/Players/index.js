import SearchBar from "components/common/SearchBar";
import PlayersList from "components/lists/PlayersList";

import useSearchPlayer from "hooks/useSearchPlayer";

const Players = () => {
  const {
    isLoading,
    players,
    searchValue,
    suggestions,
    handleSearchChange,
    handleSelectSuggestion,
    searchKey,
  } = useSearchPlayer();

  return (
    <section>
      <SearchBar
        keyword={searchKey}
        onSearchChange={handleSearchChange}
        onSuggestionClick={handleSelectSuggestion}
        searchValue={searchValue}
        suggestions={suggestions}
      />
      <PlayersList list={players} isLoading={isLoading} />
    </section>
  );
};

export default Players;

// IMAGES https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{PLAYERID}.png
