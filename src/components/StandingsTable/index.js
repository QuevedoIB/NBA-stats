import React, { useMemo, Fragment } from 'react';
import { useQuery } from 'react-query';

import NbaService from 'services/NbaService';

import { HOUR_MILLISECONDS } from 'constants.js';

import useErrorHandler from 'hooks/useErrorHandler';

import './StandingsTable.css';

const StandingsTable = () => {
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

    const standingHeaders = {
        win: 'W',
        loss: 'L',
        winPctV2: '%WR',
        homeWin: 'Home win',
        homeLoss: 'Home loss',
        awayWin: 'Visitor win',
        awayLoss: 'Visitor loss',
    };

    return standingsTable ? (
        <table style={{ border: '1px solid black' }}>
            <caption className="standings-table-title">
                Clasificación {data?.seasonYear}
            </caption>
            <thead>
                <tr>
                    <th colSpan={2}></th>
                    {Object.values(standingHeaders).map(label => (
                        <th>{label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {standingsTable.map(({ conference, teams }) => {
                    return (
                        <Fragment key={conference}>
                            <tr>
                                <th
                                    className={`standings-table-conference-label conference-${conference}`}
                                    rowSpan={teams.length + 1}
                                >
                                    <p>{conference}</p>
                                </th>
                            </tr>
                            {teams.map(team => (
                                <tr>
                                    <th>{`${team.teamSitesOnly.teamName} ${team.teamSitesOnly.teamNickname}`}</th>
                                    {Object.keys(standingHeaders).map(key => (
                                        <td key={key}>
                                            <div className="centered-container">
                                                {team[key]?.replace('.', ',')}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </Fragment>
                    );
                })}
            </tbody>
        </table>
    ) : null;
};

export default StandingsTable;
