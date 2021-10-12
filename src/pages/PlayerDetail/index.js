import { useParams } from "react-router";

import usePlayers from "hooks/usePlayers";

const PlayerDetail = () => {
  const { playerId } = useParams();
  const {
    filteredPlayers: [player],
  } = usePlayers({ key: "personId", value: playerId });
  console.log(player);
  return (
    <section>
      <h3>{player?.temporaryDisplayName}</h3>
    </section>
  );
};

export default PlayerDetail;

/*
{
    "firstName": "Precious",
    "lastName": "Achiuwa",
    "temporaryDisplayName": "Precious Achiuwa",
    "personId": "1630173",
    "teamId": "1610612761",
    "jersey": "5",
    "isActive": true,
    "pos": "F",
    "heightFeet": "6",
    "heightInches": "8",
    "heightMeters": "2.03",
    "weightPounds": "225",
    "weightKilograms": "102.1",
    "dateOfBirthUTC": "1999-09-19",
    "teamSitesOnly": {
        "playerCode": "precious_achiuwa",
        "posFull": "Forward",
        "displayAffiliation": "Memphis/Nigeria",
        "freeAgentCode": ""
    },
    "teams": [
        {
            "teamId": "1610612748",
            "seasonStart": "2020",
            "seasonEnd": "2020"
        },
        {
            "teamId": "1610612761",
            "seasonStart": "2021",
            "seasonEnd": "2021"
        }
    ],
    "draft": {
        "teamId": "1610612748",
        "pickNum": "20",
        "roundNum": "1",
        "seasonYear": "2020"
    },
    "nbaDebutYear": "2020",
    "yearsPro": "1",
    "collegeName": "Memphis",
    "lastAffiliation": "Memphis/Nigeria",
    "country": "Nigeria"
}
*/
