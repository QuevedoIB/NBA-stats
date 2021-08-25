import React from 'react';
import { useQuery } from 'react-query';

import NbaService from 'services/NbaService';

import { HOUR_MILLISECONDS } from 'constants.js';

const Players = () => {
    const { isLoading, error, data } = useQuery(
        'fetch-players',
        async () => {
            const response = await NbaService.fetchPlayers();
            console.log(response, 'RES');
            return response;
        },
        {
            staleTime: HOUR_MILLISECONDS, // only eligible to refetch after 10 seconds
        }
    );

    if (isLoading) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;

    console.log('DATA', data);

    return <div>PLAYERS</div>;
};

export default Players;

//IMAGES https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{PLAYERID}.png
