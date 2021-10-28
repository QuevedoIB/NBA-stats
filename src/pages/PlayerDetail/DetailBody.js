import { useTranslation } from "react-i18next";

import { playerProptypes, teamProptypes } from "components/types";

const DetailBody = ({ teamA, teamB, player }) => {
  const [t] = useTranslation();
  return (
    <>
      <p>
        {t("common.position")}: {t(`basketballPositions.${player?.pos}`)}
      </p>
      <p>
        {t("common.debut")}: {player?.nbaDebutYear || "-"}
      </p>
      <p>
        {t("common.team")}:{" "}
        {(teamA?.teamId === player?.teamId ? teamA : teamB)?.fullName}
      </p>
    </>
  );
};

DetailBody.propTypes = {
  player: playerProptypes,
  teamA: teamProptypes,
  teamB: teamProptypes,
};

export default DetailBody;
