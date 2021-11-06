import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import { PLAY_BY_PLAY_EVENTS } from "constants.js";

import styles from "./GameDetail.module.css";

const gameChartBulletTypes = PropTypes.shape({
  event: PropTypes.string,
  hScore: PropTypes.string.isRequired,
  hasEvent: PropTypes.any,
  name: PropTypes.string,
  positive: PropTypes.bool,
  score: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  vScore: PropTypes.string.isRequired,
  x: PropTypes.string.isRequired,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
});

export default function CustomTooltip({
  payload,
  active,
  customContent,
  gameData,
  teamsPalette,
}) {
  const [t] = useTranslation();
  if (active && payload?.[0]?.payload.hasEvent) {
    return (
      <div className={styles.tooltipContainer}>
        <div className={styles.centeredContainer}>
          <p className={styles.scoreTitle}>Score</p>
          <div className={styles.scoreBoxContainer}>
            <div className={styles.centeredContainer}>
              <p style={{ color: teamsPalette[0] }}>
                {gameData.basicGameData.hTeam.triCode}
              </p>
              <p>{payload[0].payload.hScore}</p>
            </div>
            <div className={styles.centeredContainer}>
              <p style={{ color: teamsPalette[1] }}>
                {gameData.basicGameData.vTeam.triCode}
              </p>
              <p>{payload[0].payload.vScore}</p>
            </div>
          </div>
        </div>
        {customContent && (
          <p>
            <span className={styles.player}>
              {customContent.payload.name}:{" "}
            </span>
            {t(PLAY_BY_PLAY_EVENTS[customContent.payload.event])}
          </p>
        )}
      </div>
    );
  }

  return null;
}

CustomTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: gameChartBulletTypes.isRequired,
    })
  ),
  active: PropTypes.bool,
  customContent: PropTypes.shape({
    payload: gameChartBulletTypes.isRequired,
  }),
  gameData: PropTypes.shape({
    basicGameData: PropTypes.shape({
      hTeam: PropTypes.shape({ triCode: PropTypes.string.isRequired })
        .isRequired,
      vTeam: PropTypes.shape({ triCode: PropTypes.string.isRequired })
        .isRequired,
    }).isRequired,
  }),
  teamsPalette: PropTypes.arrayOf(PropTypes.string).isRequired,
};
