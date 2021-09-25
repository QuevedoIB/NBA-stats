import React, { useState, useCallback } from "react";

import SearchBar from "components/SearchBar";
import Spinner from "components/common/Spinner";
import PlayersList from "components/lists/PlayersList";

import usePlayers from "hooks/usePlayers";

const Players = () => {
  const [searchPlayer, setSearchPlayer] = useState("");
  const { isLoading, players, filteredPlayers } = usePlayers({
    key: "temporaryDisplayName",
    value: searchPlayer,
  });

  const updateSearchedPlayer = useCallback(({ target: { value } }) => {
    setSearchPlayer(value);
  }, []);

  const onSelectSuggestedPlayer = useCallback(({ temporaryDisplayName }) => {
    setSearchPlayer(temporaryDisplayName);
  }, []);

  const displayedSuggestions =
    !(
      filteredPlayers?.length === 1 &&
      filteredPlayers[0].temporaryDisplayName === searchPlayer
    ) && filteredPlayers;

  return isLoading ? (
    <Spinner />
  ) : (
    <section>
      <SearchBar
        searchText={searchPlayer}
        suggestions={displayedSuggestions}
        keyword="temporaryDisplayName"
        onSuggestionClick={onSelectSuggestedPlayer}
        onSearchChange={updateSearchedPlayer}
      />
      <PlayersList list={searchPlayer ? filteredPlayers : players} />
    </section>
  );
};

export default Players;

// IMAGES https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{PLAYERID}.png
