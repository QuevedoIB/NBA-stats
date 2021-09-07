import React from 'react';

import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import NbaService from 'services/NbaService';

import { HOUR_MILLISECONDS } from 'constants.js';

const TeamDetail = () => {
    const { teamId } = useParams();

    const teamData = useSelector(state =>
        state.teams.teams.find(e => e.teamId === teamId)
    );

    const { data: roster } = useQuery(
        `fetch-${teamId}-roster`,
        async () => {
            const response = await NbaService.fetchTeamRoster(teamData.urlName);
            return response?.data;
        },
        {
            staleTime: HOUR_MILLISECONDS,
        }
    );

    console.log(teamId, teamData, roster);
    return <div></div>;
};

export default TeamDetail;
