import React from "react";
import i18n from "i18n";

import { formatDate } from "helpers/formatDate";

import styles from "./GameCard.module.css";

const GameCard = ({ teams, game: { hTeam, vTeam, startTimeUTC } }) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <p>{teams[hTeam.teamId]?.fullName}</p>
        <p>vs</p>
        <p>{teams[vTeam.teamId]?.fullName}</p>
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
