import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import PlayerImage from "components/common/images/PlayerImage";

import styles from "./PlayerCard.module.css";

import { formatDate } from "helpers/formatDate";
import useCountryCodes from "hooks/useCountryCodes";
import useTeams from "hooks/useTeams";

const PlayerCard = ({ player }) => {
  const { i18n } = useTranslation();
  const { code: countryFlagCode } = useCountryCodes({
    countryName: player.country,
  });

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
            {formatDate(player.dateOfBirthUTC, i18n.language)}
            {countryFlagCode && (
              <img
                className={styles.countryIcon}
                src={`https://www.countryflags.io/${countryFlagCode}/flat/24.png`}
                alt="country"
                loading="lazy"
                title={player.country}
              />
            )}
          </p>
          {playerTeam && (
            <div className={`${styles.team} ${styles.centeredInfoContainer}`}>
              <img
                loading="lazy"
                src={`https://cdn.nba.com/logos/nba/${playerTeam.teamId}/global/L/logo.svg`}
                alt={`${playerTeam.fullName} logo`}
                title={playerTeam.fullName}
              />
              {player.pos}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default PlayerCard;

// C F G

// base -> G
// escolta -> G
// alero -> F
// ala pivot -> F-C
// pivot -> C-F

/*
C= Pivot
PF= Ala pivot
SF= Alero
SG= Escolta
PG= Base

*/
