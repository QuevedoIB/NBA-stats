import React, { useState } from 'react';
import { useQuery } from 'react-query';

import Spinner from 'components/common/Spinner';

import NbaService from 'services/NbaService';

import { HOUR_MILLISECONDS } from 'constants.js';

import useErrorHandler from 'hooks/useErrorHandler';
import { useTeams } from 'hooks/useTeams';

import './GamesResult.css';

const GamesResult = () => {
    const { teams } = useTeams();
    const today = new Date();
    const [date, setDate] = useState(
        '20210312'
        //`${today.getUTCFullYear()}${today.getUTCMonth()}${today.getUTCDate()}`
    );
    const { isLoading, error, data } = useQuery(
        `fetch-${date}-games`,
        async () => {
            const { data } = await NbaService.fetchDayGames(date);
            return data;
        },
        {
            staleTime: HOUR_MILLISECONDS,
        }
    );
    useErrorHandler(error?.message);

    return (
        <div className="games-result-container border-container">
            <h3 className="title">{`Resultados ${date}`}</h3>
            <ul>
                {!data?.numGames ? (
                    <li>No hay resultados para esa fecha</li>
                ) : (
                    data.games.map(game => {
                        const visitorTeam = teams.find(
                            ({ teamId }) => teamId === game.vTeam.teamId
                        );

                        const homeTeam = teams.find(
                            ({ teamId }) => teamId === game.hTeam.teamId
                        );
                        console.log(visitorTeam, homeTeam, game);
                        return (
                            <li key={game.gameId}>
                                <p>{`${homeTeam?.fullName} vs ${visitorTeam?.fullName}`}</p>
                                <p>{`${game.hTeam?.score} - ${game.vTeam?.score}`}</p>
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
};

export default GamesResult;
