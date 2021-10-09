import React from "react";

import { useParams } from "react-router";
import { useQuery } from "react-query";

import RosterList from "./RosterList";
import NbaService from "services/NbaService";

import { HOUR_MILLISECONDS } from "constants.js";
import useTeams from "hooks/useTeams";
import usePlayers from "hooks/usePlayers";

import styles from "./TeamDetail.module.css";
import Calendar from "./Calendar";

const TeamDetail = () => {
  const { teamId } = useParams();
  const {
    filteredTeams: [teamData],
    teams,
  } = useTeams({ filter: { key: "teamId", value: teamId } });
  const { filteredPlayers } = usePlayers({ key: "teamId", value: teamId });

  // const { data: roster } = useQuery(
  //   `fetch-${teamId}-roster`,
  //   async () => {
  //     const response = await NbaService.fetchTeamRoster(teamData?.urlName);
  //     return response;
  //   },
  //   {
  //     staleTime: HOUR_MILLISECONDS,
  //   }
  // );

  console.log(teamData);

  const { data: calendar } = useQuery(
    `fetch-${teamId}-calendar`,
    async () => {
      const response = await NbaService.fetchTeamCalendar(teamData?.urlName);
      return response;
    },
    {
      staleTime: HOUR_MILLISECONDS,
    }
  );

  // const { data: leaders } = useQuery(
  //   `fetch-${teamId}-leaders`,
  //   async () => {
  //     const response = await NbaService.fetchTeamLeaders(teamId);
  //     return response;
  //   },
  //   {
  //     staleTime: HOUR_MILLISECONDS,
  //   }
  // );

  // console
  //   .log
  //   // calendar
  //   // roster,
  //   // teamId,
  //   // leaders,
  //   // "TEAM PLAYERS",
  //   // filteredPlayers,
  //   // teamData
  //   ();

  return (
    <>
      <h2>{teamData?.fullName}</h2>
      <section className={styles.container}>
        <RosterList roster={filteredPlayers} />
        <Calendar teams={teams} calendar={calendar} />
      </section>
    </>
  );
};

export default TeamDetail;
