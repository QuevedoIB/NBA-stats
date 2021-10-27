import { Link } from "react-router-dom";

import styles from "./GameDetail.module.css";

export default function CustomLegend({ game, teams, teamsPalette }) {
  const homeTeam = teams.find((e) => e.teamId === game.hTeam.teamId)?.fullName;
  const visitorTeam = teams.find(
    (e) => e.teamId === game.vTeam.teamId
  )?.fullName;

  return (
    <div className={styles.legendContainer}>
      <div style={{ backgroundColor: teamsPalette[0] }} />
      <Link to={`/team-detail/${game.hTeam.teamId}`}>
        <p>{homeTeam}</p>
      </Link>
      <div style={{ backgroundColor: teamsPalette[1] }} />
      <Link to={`/team-detail/${game.vTeam.teamId}`}>
        <p>{visitorTeam}</p>
      </Link>
    </div>
  );
}
