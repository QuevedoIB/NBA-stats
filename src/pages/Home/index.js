import React, { useMemo } from 'react';
import { useQuery } from 'react-query';

import NbaService from 'services/NbaService';

import { HOUR_MILLISECONDS } from 'constants.js';

import useErrorHandler from 'hooks/useErrorHandler';

const Home = () => {
    const { isLoading, error, data } = useQuery(
        'fetch-players',
        async () => {
            const response = await NbaService.fetchStandings();
            return response;
        },
        {
            staleTime: HOUR_MILLISECONDS,
        }
    );
    useErrorHandler(error?.message);

    const standingsTable = useMemo(() => {
        if (!data) return;
        const conferences = Object.entries(data.conference).map(
            ([conference, teams]) => {
                return {
                    conference,
                    teams: Object.values(teams)
                        .flat()
                        .sort((a, b) => a.confRank - b.confRank),
                };
            }
        );
        return conferences;
    }, [data]);

    console.log(data, 'STANDINGS', standingsTable);

    return <div>HOME</div>;
};

export default Home;
