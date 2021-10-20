import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import SearchBar from "components/common/SearchBar";
import PlayerImage from "components/common/images/PlayerImage";
import PlayerStats from "components/PlayerStats";
import Select from "components/common/Select";

import usePlayers from "hooks/usePlayers";
import useSearchPlayer from "hooks/useSearchPlayer";

import styles from "./PlayerDetail.module.css";
import useTeams from "hooks/useTeams";

const PlayerDetail = () => {
  const { playerId } = useParams();
  const [seasonStats, setSeasonStats] = useState("careerSummary");
  const {
    filteredPlayers: [player],
  } = usePlayers({ key: "personId", value: playerId });

  const {
    searchValue,
    suggestions,
    selectedSuggestion,
    handleSearchChange,
    handleSelectSuggestion,
    searchKey,
    handleReset,
  } = useSearchPlayer();

  const {
    filteredTeams: [team1, team2],
  } = useTeams({
    filter: {
      key: "teamId",
      value: [player?.teamId, selectedSuggestion?.teamId],
    },
  });

  useEffect(() => {
    handleReset();
  }, [handleReset, playerId]);

  const seasonYearsOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const yearsBetween = [
      {
        value: "careerSummary",
        name: "All",
      },
      {
        value: "latest",
        name: currentYear,
      },
    ];
    for (let year = currentYear - 1; year >= +player?.nbaDebutYear; year--) {
      yearsBetween.push({ name: year, value: year });
    }
    return yearsBetween;
  }, [player?.nbaDebutYear]);

  const handleSeasonYearChange = useCallback(({ target: { value } }) => {
    setSeasonStats(value);
  }, []);

  //console.log(player, chartsData, seasonYearsOptions, data);

  return (
    <section className={styles.container}>
      <section className={styles.playersContainer}>
        <article>
          <h3 className={styles.title}>{player?.temporaryDisplayName}</h3>
          <PlayerImage player={player} />
          <div>
            <div className={styles.seasonSelect}>
              <label htmlFor="season-year">Season stats: </label>
              <Select
                id="season-year"
                options={seasonYearsOptions}
                value={seasonStats}
                onChange={handleSeasonYearChange}
              />
            </div>
            <p>Position: {player?.pos}</p>
            <p>Debut: {player?.nbaDebutYear || "-"}</p>
            <p>
              Team:{" "}
              {(team1?.teamId === player?.teamId ? team1 : team2)?.fullName}
            </p>
          </div>
        </article>
        <article>
          <SearchBar
            searchValue={searchValue}
            suggestions={suggestions}
            keyword={searchKey}
            onSearchChange={handleSearchChange}
            onSuggestionClick={handleSelectSuggestion}
          />
          {selectedSuggestion && (
            <>
              <Link
                to={`/player-detail/${selectedSuggestion.personId}`}
                className={styles.comparedPlayer}
              >
                <PlayerImage player={selectedSuggestion} />
              </Link>
              <div>
                <p>Position: {selectedSuggestion?.pos}</p>
                <p>Debut: {selectedSuggestion?.nbaDebutYear || "-"}</p>
                <p>
                  Team:{" "}
                  {
                    (team1.teamId === selectedSuggestion.teamId ? team1 : team2)
                      ?.fullName
                  }
                </p>
              </div>
            </>
          )}
        </article>
      </section>
      <PlayerStats
        playerA={player}
        playerB={selectedSuggestion}
        season={seasonStats}
      />
    </section>
  );
};

export default PlayerDetail;

/*


Estadísticas

FGM Tiros de campo anotados
FGA Tiros de campo intentados
FTM Tiros libres anotados
FTA Tiros libres intentados
3PM Triples anotados
3PA Triples intentados

https://data.nba.net/10s/prod/v1/2020/players/2544_profile.json
https://www.nba.com/stats/help/glossary/#dd2

"careerSummary": {
"tpp": "34.5", Three point %
"ftp": "73.3", Free throw %
"fgp": "50.4", 2pt throw %
"ppg": "27", points per game
"rpg": "7.4", rebounds per game
"apg": "7.4", assists per game
"bpg": "0.8", blocks per game
"mpg": "38.2", minutes per game
"spg": "1.6", steals per game
"assists": "9696",
"blocks": "982",
"steals": "2063",
"turnovers": "4592",
"offReb": "1538",
"defReb": "8213",
"totReb": "9751",
"fgm": "12903", Tiros de campo anotados
"fga": "25604", Tiros de campo intentados
"tpm": "1979", Triples anotados
"tpa": "5738", Triples intentados
"ftm": "7582", Tiros libres anotados
"fta": "10337", Tiros libres intentados
"pFouls": "2395", Faltas hechas
"points": "35367",
"gamesPlayed": "1310",
"gamesStarted": "1309",
"plusMinus": "7136",
"min": "50053",
"dd2": "507", Double Doubles
"td3": "99" Triple Doubles
},


"regularSeason": {
"season": [
{
"seasonYear": 2020,
"teams": [
{
"teamId": "1610612747",
"ppg": "25",
"rpg": "7.7",
"apg": "7.8",
"mpg": "33.4",
"topg": "3.7",
"spg": "1.1",
"bpg": "0.6",
"tpp": "36.5",
"ftp": "69.8",
"fgp": "51.3",
"assists": "350",
"blocks": "25",
"steals": "48",
"turnovers": "168",
"offReb": "29",
"defReb": "317",
"totReb": "346",
"fgm": "422",
"fga": "823",
"tpm": "104",
"tpa": "285",
"ftm": "178",
"fta": "255",
"pFouls": "70",
"points": "1126",
"gamesPlayed": "45",
"gamesStarted": "45",
"plusMinus": "290",
"min": "1503",
"dd2": "18",
"td3": "5"
}
],
"total": {
"ppg": "25",
"rpg": "7.7",
"apg": "7.8",
"mpg": "33.4",
"topg": "3.7",
"spg": "1.1",
"bpg": "0.6",
"tpp": "36.5",
"ftp": "69.8",
"fgp": "51.3",
"assists": "350",
"blocks": "25",
"steals": "48",
"turnovers": "168",
"offReb": "29",
"defReb": "317",
"totReb": "346",
"fgm": "422",
"fga": "823",
"tpm": "104",
"tpa": "285",
"ftm": "178",
"fta": "255",
"pFouls": "70",
"points": "1126",
"gamesPlayed": "45",
"gamesStarted": "45",
"plusMinus": "290",
"min": "1503",
"dd2": "18",
"td3": "5"
}
},

*/
