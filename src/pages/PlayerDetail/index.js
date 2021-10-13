import { useState, useCallback, useMemo } from "react";
import { useParams } from "react-router";

import SearchBar from "components/SearchBar";

import usePlayers from "hooks/usePlayers";
import usePlaceHolderSource from "hooks/usePlaceholderSource";

import PlaceholderImage from "public/images/player-placeholder.png";

import styles from "./PlayerDetail.module.css";

const PlayerDetail = () => {
  const [searchPlayer, setSearchPlayer] = useState("");
  const { playerId } = useParams();
  const {
    filteredPlayers: [player],
  } = usePlayers({ key: "personId", value: playerId });

  const { src, loaded: loadedImage } = usePlaceHolderSource({
    src: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`,
    placeHolderSrc: PlaceholderImage,
  });

  const suggestions = useMemo(() => [], [searchPlayer]);

  const updateSearchedPlayer = useCallback(({ target: { value } }) => {
    setSearchPlayer(value);
  }, []);

  const onSelectSuggestedPlayer = useCallback(({ temporaryDisplayName }) => {
    setSearchPlayer(temporaryDisplayName);
  }, []);

  console.log(player);
  return (
    <section className={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "fit-content",
        }}
      >
        <h3>{player?.temporaryDisplayName}</h3>
        <img
          src={src}
          alt={`${player.temporaryDisplayName}`}
          className={`${styles.image} ${
            loadedImage ? "" : styles.placeholderImage
          }`}
          loading="lazy"
        />
      </div>
      <div>
        <SearchBar
          searchText={searchPlayer}
          suggestions={suggestions}
          keyword="temporaryDisplayName"
          onSuggestionClick={onSelectSuggestedPlayer}
          onSearchChange={updateSearchedPlayer}
        />
      </div>
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
