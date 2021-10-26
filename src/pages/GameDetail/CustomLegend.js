import styles from "./GameDetail.module.css";

export default function CustomLegend({ game, teams, teamsPalette }) {
  const homeTeam = teams.find((e) => e.teamId === game.hTeam.teamId)?.fullName;
  const visitorTeam = teams.find(
    (e) => e.teamId === game.vTeam.teamId
  )?.fullName;

  return (
    <div className={styles.legendContainer}>
      <div style={{ backgroundColor: teamsPalette[0] }} />
      <p>{homeTeam}</p>
      <div style={{ backgroundColor: teamsPalette[1] }} />
      <p>{visitorTeam}</p>
    </div>
  );
}
