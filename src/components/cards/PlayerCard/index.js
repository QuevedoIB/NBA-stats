import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import PlaceholderImage from "public/images/player-placeholder.png";

import styles from "./PlayerCard.module.css";

import { formatDate } from "helpers/formatDate";
import useCountryCodes from "hooks/useCountryCodes";
import useTeams from "hooks/useTeams";
import usePlaceHolderSource from "hooks/usePlaceholderSource";

const PlayerCard = ({ player }) => {
  const { i18n } = useTranslation();
  const { code: countryFlagCode } = useCountryCodes({
    countryName: player.country,
  });

  const { src, loaded: loadedImage } = usePlaceHolderSource({
    src: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`,
    placeHolderSrc: PlaceholderImage,
  });

  const { teams } = useTeams();

  const playerTeam = useMemo(
    () => teams?.find((team) => team.teamId === player.teamId),
    [player.teamId, teams]
  );

  return (
    <li className={styles.container}>
      <img
        src={src}
        alt={`${player.temporaryDisplayName}`}
        className={`${styles.image} ${
          loadedImage ? "" : styles.placeholderImage
        }`}
        loading="lazy"
      />
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
