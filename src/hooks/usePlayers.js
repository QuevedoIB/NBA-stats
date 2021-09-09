import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';

import NbaService from 'services/NbaService';
import { setPlayers } from 'redux/reducers/players';
import useErrorHandler from 'hooks/useErrorHandler';

import { HOUR_MILLISECONDS } from 'constants.js';

export default function usePlayers(filter = { key: '', value: '' }) {
    const dispatch = useDispatch();
    const players = useSelector(state => state.players.players);

    const { isLoading, error } = useQuery(
        'fetch-players',
        async () => {
            const response = await NbaService.fetchPlayers();
            dispatch(setPlayers(response || []));
            return response;
        },
        {
            staleTime: HOUR_MILLISECONDS,
        }
    );
    useErrorHandler(error?.message);

    const filteredPlayers = useMemo(() => {
        if (!filter.value || !filter.key) return;
        return players.filter(
            e =>
                e[filter.key] === filter.value ||
                e[filter.key]
                    ?.toLowerCase()
                    ?.includes(filter.value?.toLowerCase())
        );
    }, [filter.key, filter.value, players]);

    return { isLoading, players, filteredPlayers };
}
