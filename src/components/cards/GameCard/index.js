import React, { useMemo } from "react";
import i18n from "i18n";

import useTeams from "hooks/useTeams";
import { formatDate } from "helpers/formatDate";

import styles from "./GameCard.module.css";

const GameCard = ({ game: { hTeam, vTeam, startTimeUTC } }) => {
  const { teams } = useTeams();

  const parsedIdTeams = useMemo(() => {
    return teams?.reduce((acc, team) => {
      acc[team.teamId] = team;
      return acc;
    }, {});
  }, [teams]);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <p>{parsedIdTeams[hTeam.teamId]?.fullName}</p>
        <p>vs</p>
        <p>{parsedIdTeams[vTeam.teamId]?.fullName}</p>
      </div>
      {hTeam.score || vTeam.score ? (
        <div className={styles.infoContainer}>
          <p>{hTeam.score}</p>
          <p>-</p>
          <p>{vTeam.score}</p>
        </div>
      ) : (
        <p> {formatDate(startTimeUTC, i18n.language)}</p>
      )}
    </div>
  );
};

export default GameCard;
