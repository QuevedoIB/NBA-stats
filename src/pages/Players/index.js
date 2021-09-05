import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';

import SearchBar from 'components/SearchBar';
import Spinner from 'components/common/Spinner';
import PlayersList from 'components/lists/PlayersList';

import NbaService from 'services/NbaService';
import { setPlayers } from 'redux/reducers/players';
import useErrorHandler from 'hooks/useErrorHandler';

import { HOUR_MILLISECONDS } from 'constants.js';

const Players = () => {
    const dispatch = useDispatch();
    const players = useSelector(state => state.players.players);
    const [searchPlayer, setSearchPlayer] = useState('');

    const { isLoading, error } = useQuery(
        'fetch-players',
        async () => {
            const response = await NbaService.fetchPlayers();
            dispatch(setPlayers(response?.data?.league || []));
            return response;
        },
        {
            staleTime: HOUR_MILLISECONDS,
        }
    );
    useErrorHandler(error?.message);

    const updateSearchedPlayer = useCallback(({ target: { value } }) => {
        setSearchPlayer(value);
    }, []);

    const onSelectSuggestedPlayer = useCallback(({ temporaryDisplayName }) => {
        setSearchPlayer(temporaryDisplayName);
    }, []);

    const filteredPlayers = useMemo(() => {
        if (!searchPlayer) return;
        return players.filter(e =>
            e.temporaryDisplayName
                ?.toLowerCase()
                ?.includes(searchPlayer.toLowerCase())
        );
    }, [players, searchPlayer]);

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

//IMAGES https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{PLAYERID}.png
