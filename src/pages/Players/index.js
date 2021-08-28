import React from 'react';
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

    return isLoading ? (
        <Spinner />
    ) : (
        <div>
            <SearchBar
                list={players}
                keyword="temporaryDisplayName"
                suggestionsAmount={3}
            />
        </div>
    );
};

export default Players;

//IMAGES https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{PLAYERID}.png
