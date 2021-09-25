import React from "react";

import { useParams } from "react-router";
import { useQuery } from "react-query";

import RosterList from "./RosterList";
import NbaService from "services/NbaService";

import { HOUR_MILLISECONDS } from "constants.js";
import useTeams from "hooks/useTeams";
import usePlayers from "hooks/usePlayers";

const TeamDetail = () => {
  const { teamId } = useParams();
  const {
    filteredTeams: [teamData],
  } = useTeams({ filter: { key: "teamId", value: teamId } });
  const { filteredPlayers } = usePlayers({ key: "teamId", value: teamId });

  const { data: roster } = useQuery(
    `fetch-${teamId}-roster`,
    async () => {
      const response = await NbaService.fetchTeamRoster(teamData.urlName);
      return response;
    },
    {
      staleTime: HOUR_MILLISECONDS,
    }
  );

  const { data: calendar } = useQuery(
    `fetch-${teamId}-calendar`,
    async () => {
      const response = await NbaService.fetchTeamCalendar(teamData.urlName);
      return response;
    },
    {
      staleTime: HOUR_MILLISECONDS,
    }
  );

  const { data: leaders } = useQuery(
    `fetch-${teamId}-leaders`,
    async () => {
      const response = await NbaService.fetchTeamLeaders(teamId);
      return response;
    },
    {
      staleTime: HOUR_MILLISECONDS,
    }
  );

  console.log(
    calendar,
    roster,
    teamId,
    leaders,
    "TEAM PLAYERS",
    filteredPlayers,
    teamData
  );

  return (
    <section>
      <h1>{teamData?.fullName}</h1>
      <RosterList roster={filteredPlayers} />
    </section>
  );
};

export default TeamDetail;
