import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';

import SearchBar from 'components/SearchBar';
import Spinner from 'components/common/Spinner';

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
            staleTime: HOUR_MILLISECONDS, // only eligible to refetch after 10 seconds
        }
    );
    useErrorHandler(error?.message);

    const updateSearchedPlayer = useCallback(({ target: { value } }) => {
        setSearchPlayer(value);
    }, []);

    const onSelectSuggestedPlayer = useCallback(({ temporaryDisplayName }) => {
        setSearchPlayer(temporaryDisplayName);
    }, []);

    return isLoading ? (
        <Spinner />
    ) : (
        <div>
            <SearchBar
                searchText={searchPlayer}
                list={players}
                keyword="temporaryDisplayName"
                suggestionsAmount={3}
                onSuggestionClick={onSelectSuggestedPlayer}
                onSearchChange={updateSearchedPlayer}
            />
        </div>
    );
};

export default Players;

//IMAGES https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{PLAYERID}.png
