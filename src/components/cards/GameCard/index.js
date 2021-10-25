import { Link } from "react-router-dom";
import i18n from "i18n";

import { formatDate } from "helpers/formatDate";

import styles from "./GameCard.module.css";

const GameCard = ({
  teams,
  game: { hTeam, vTeam, startTimeUTC, gameId, homeStartDate },
}) => (
  <Link to={`/game-detail/${homeStartDate}/${gameId}`}>
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

export default GameCard;
