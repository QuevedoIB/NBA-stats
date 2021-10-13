import { useReducer, useCallback } from "react";

import SearchBar from "components/SearchBar";
import usePlayers from "hooks/usePlayers";

const initialSearchPlayerState = {
  search: "",
  suggestions: [],
};

const searchPlayerReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_INPUT":
      return state;
    case "SELECT_SUGGESTION":
      return state;
    default:
      return state;
  }
};

const SearchPlayer = () => {
  const { filteredPlayers } = usePlayers();
  const [{ search, suggestions }, dispatch] = useReducer(
    searchPlayerReducer,
    initialSearchPlayerState
  );

  const handleSearchChange = useCallback(() => {}, []);

  return <div></div>;
};

export default SearchPlayer;
