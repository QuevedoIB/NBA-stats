import React from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';

import TeamList from 'components/lists/TeamList';
import Spinner from 'components/common/Spinner';

import { setTeams } from 'redux/reducers/teams';
import useErrorHandler from 'hooks/useErrorHandler';
import NbaService from 'services/NbaService';

import { HOUR_MILLISECONDS } from 'constants.js';

const Teams = () => {
    const teams = useSelector(state => state.teams.teams);
    const dispatch = useDispatch();
    const { isLoading, error } = useQuery(
        'fetch-teams',
        async () => {
            const response = await NbaService.fetchTeams();
            dispatch(setTeams(response?.data?.league || []));
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
        <section className="teams-list-container">
            {Object.entries(teams).map(([division, teams]) => (
                <TeamList key={division} division={division} teams={teams} />
            ))}
        </section>
    );
};

export default Teams;
