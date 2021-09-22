import React from 'react'

// import { useParams } from 'react-router';
// import { useSelector } from 'react-redux';
// import { useQuery } from 'react-query';

// import NbaService from 'services/NbaService';

// import { HOUR_MILLISECONDS } from 'constants.js';
import  useTeams  from 'hooks/useTeams'

const TeamDetail = () => {
  // const { teamId } = useParams();
  useTeams()
  // const teamData = useSelector(state =>
  //     state.teams.teams.find(e => e.teamId === teamId)
  // );

  // const { data: roster } = useQuery(
  //     `fetch-${teamId}-roster`,
  //     async () => {
  //         const response = await NbaService.fetchTeamRoster(teamData.urlName);
  //         return response?.data;
  //     },
  //     {
  //         staleTime: HOUR_MILLISECONDS,
  //     }
  // );

  // const { data: calendar } = useQuery(
  //     `fetch-${teamId}-calendar`,
  //     async () => {
  //         const response = await NbaService.fetchTeamCalendar(
  //             teamData.urlName
  //         );
  //         return response?.data;
  //     },
  //     {
  //         staleTime: HOUR_MILLISECONDS,
  //     }
  // );

  return <div />
}

export default TeamDetail
