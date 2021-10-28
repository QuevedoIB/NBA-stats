import { Link } from "react-router-dom";
import i18n from "i18n";
import PropTypes from "prop-types";

import { formatDate } from "helpers/formatDate";

import { gamePropTypes, teamProptypes } from "components/types";

import styles from "./GameCard.module.css";

const GameCard = ({
  teams,
  game: { hTeam, vTeam, startTimeUTC, gameId, startDateEastern },
}) => (
  <Link to={`/game-detail/${startDateEastern}/${gameId}`}>
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <p className={styles.team}>{teams[hTeam.teamId]?.fullName}</p>
        <p className={styles.separator}>vs</p>
        <p className={styles.team}>{teams[vTeam.teamId]?.fullName}</p>
      </div>
      {hTeam.score || vTeam.score ? (
        <div className={styles.infoContainer}>
          <p className={styles.team}>{hTeam.score}</p>
          <p className={styles.separator}>-</p>
          <p className={styles.team}>{vTeam.score}</p>
        </div>
      ) : (
        <p className={styles.date}>{formatDate(startTimeUTC, i18n.language)}</p>
      )}
    </div>
  </Link>
);

GameCard.propTypes = {
  teams: PropTypes.objectOf(teamProptypes),
  game: gamePropTypes,
};

export default GameCard;
