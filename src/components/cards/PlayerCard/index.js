import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import PlayerImage from "components/common/images/PlayerImage";
import CountryFlag from "components/common/images/CountryFlag";

import { formatDate } from "helpers/formatDate";
import useTeams from "hooks/useTeams";

import { playerProptypes } from "components/types";

import styles from "./PlayerCard.module.css";

const PlayerCard = ({ player }) => {
  const { t, i18n } = useTranslation();

  const { teams } = useTeams();

  const playerTeam = useMemo(
    () => teams?.find((team) => team.teamId === player.teamId),
    [player.teamId, teams]
  );

  return (
    <li className={styles.container}>
      <PlayerImage player={player} />
      <div className={styles.infoContainer}>
        <div>
          <p className={styles.title}>{player.temporaryDisplayName}</p>
          <p className={`${styles.subtitle} ${styles.centeredInfoContainer}`}>
            {formatDate(player.dateOfBirthUTC, i18n.language, false)}
            <CountryFlag player={player} />
          </p>
          {playerTeam && (
            <div className={`${styles.team} ${styles.centeredInfoContainer}`}>
              <img
                loading="lazy"
                src={`https://cdn.nba.com/logos/nba/${playerTeam.teamId}/global/L/logo.svg`}
                alt={`${playerTeam.fullName} logo`}
                title={playerTeam.fullName}
              />
              {t(`basketballPositions.${player.pos}`)}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

PlayerCard.propTypes = {
  player: playerProptypes.isRequired,
};

export default PlayerCard;
