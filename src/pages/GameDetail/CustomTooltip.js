import { PLAY_BY_PLAY_EVENTS } from "constants.js";

import styles from "./GameDetail.module.css";

export default function CustomTooltip({
  payload,
  active,
  customContent,
  gameData,
  teamsPalette,
}) {
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
            {PLAY_BY_PLAY_EVENTS[customContent.payload.event]}
          </p>
        )}
      </div>
    );
  }

  return null;
}
