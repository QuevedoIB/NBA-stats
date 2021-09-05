import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';

import { setTeams } from 'redux/reducers/teams';
import useErrorHandler from 'hooks/useErrorHandler';
import NbaService from 'services/NbaService';

import { HOUR_MILLISECONDS } from 'constants.js';

export function useTeams(refetch = true) {
    const teams = useSelector(state => state.teams.teams);
    const dispatch = useDispatch();
    const { isLoading, error } = useQuery(
        'fetch-teams',
        async () => {
            if (!refetch) return;
            const response = await NbaService.fetchTeams();
            dispatch(setTeams(response?.data?.league || []));
            return response;
        },
        {
            staleTime: HOUR_MILLISECONDS,
        }
    );
    useErrorHandler(error?.message);

    return { isLoading, error, teams };
}
