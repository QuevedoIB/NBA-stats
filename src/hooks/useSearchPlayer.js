import { useCallback, useReducer } from "react";

import usePlayers from "hooks/usePlayers";

const UPDATE_INPUT = "UPDATE_INPUT";
const SELECT_SUGGESTION = "SELECT_SUGGESTION";
const RESET_SEARCH = "RESET_SEARCH";

const initialSearchPlayerState = {
  searchValue: "",
  suggestions: false,
  selectedSuggestion: null,
};

const searchPlayerReducer = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_INPUT:
      return {
        ...state,
        suggestions: true,
        searchValue: payload.searchValue,
        selectedSuggestion: null,
      };
    case SELECT_SUGGESTION:
      return {
        ...state,
        suggestions: false,
        searchValue: payload.searchValue,
        selectedSuggestion: payload.selectedSuggestion,
      };
    case RESET_SEARCH:
      return initialSearchPlayerState;
    default:
      return state;
  }
};

export default function useSearchPlayer({
  searchKey = "temporaryDisplayName",
  initialList = true,
} = {}) {
  const [{ searchValue, suggestions, selectedSuggestion }, dispatch] =
    useReducer(searchPlayerReducer, initialSearchPlayerState);
  const { isLoading, filteredPlayers, players } = usePlayers({
    key: searchKey,
    value: searchValue,
  });

  const handleSearchChange = useCallback(({ target: { value } }) => {
    dispatch({
      type: UPDATE_INPUT,
      payload: {
        searchValue: value,
      },
    });
  }, []);

  const handleSelectSuggestion = useCallback(
    (selectedSuggestion) => {
      dispatch({
        type: SELECT_SUGGESTION,
        payload: {
          searchValue: selectedSuggestion[searchKey],
          selectedSuggestion,
        },
      });
    },
    [searchKey]
  );

  const handleReset = useCallback(() => dispatch({ type: RESET_SEARCH }), []);

  return {
    isLoading,
    searchKey,
    searchValue,
    selectedSuggestion,
    suggestions: suggestions ? filteredPlayers : [],
    players: !searchValue && initialList ? players : filteredPlayers,
    handleSearchChange,
    handleSelectSuggestion,
    handleReset,
  };
}
