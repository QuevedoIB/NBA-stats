import React, { Fragment } from 'react';
import { useQuery } from 'react-query';

import Spinner from 'components/common/Spinner';

import NbaService from 'services/NbaService';
import NewsFeedService from 'services/NewsFeedService';

import { HOUR_MILLISECONDS } from 'constants.js';

import useErrorHandler from 'hooks/useErrorHandler';

import './StandingsTable.css';
import { useTranslation } from 'react-i18next';

const StandingsTable = () => {
    const [t] = useTranslation();
    const { isLoading, error, data } = useQuery(
        'fetch-standings',
        async () => {
            const response = await NbaService.fetchStandings();
            return response;
        },
        {
            staleTime: HOUR_MILLISECONDS,
        }
    );
    useErrorHandler(error?.message);

    const standingHeaders = [
        'win',
        'loss',
        'winPctV2',
        'homeWin',
        'homeLoss',
        'awayWin',
        'awayLoss',
    ];

    if (isLoading) return <Spinner />;

    return (
        <section className="table-container">
            <table>
                <caption className="title border-container standings-table-title">
                    {`${t('standings.title')} ${data?.seasonYear}`}
                </caption>
                <thead>
                    <tr>
                        <th colSpan={2}></th>
                        {standingHeaders.map(key => (
                            <th key={key}>{t(`standings.${key}`)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data?.conference || {}).map(
                        ([conference, teams]) => {
                            return (
                                <Fragment key={conference}>
                                    <tr>
                                        <th
                                            className={`standings-table-conference-label conference-${conference}`}
                                            rowSpan={teams.length + 1}
                                        >
                                            <p>
                                                {t(`conferences.${conference}`)}
                                            </p>
                                        </th>
                                    </tr>
                                    {teams.map(team => (
                                        <tr key={team.teamId}>
                                            <th>{`${team.teamSitesOnly.teamName} ${team.teamSitesOnly.teamNickname}`}</th>
                                            {standingHeaders.map(key => (
                                                <td key={key}>
                                                    <div className="centered-container">
                                                        {team[key]?.replace(
                                                            '.',
                                                            ','
                                                        )}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </Fragment>
                            );
                        }
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default StandingsTable;
