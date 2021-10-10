import React, { useState, useCallback, useMemo } from "react";

import SearchBar from "components/SearchBar";
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

  const suggestions = useMemo(
    () =>
      !(
        filteredPlayers?.length === 1 &&
        filteredPlayers[0].temporaryDisplayName === searchPlayer
      )
        ? filteredPlayers
        : [],
    [filteredPlayers, searchPlayer]
  );

  return (
    <section>
      <SearchBar
        searchText={searchPlayer}
        suggestions={suggestions}
        keyword="temporaryDisplayName"
        onSuggestionClick={onSelectSuggestedPlayer}
        onSearchChange={updateSearchedPlayer}
      />
      <PlayersList
        list={searchPlayer ? filteredPlayers : players}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Players;

// IMAGES https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{PLAYERID}.png
