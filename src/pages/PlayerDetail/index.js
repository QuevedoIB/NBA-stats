import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

import SearchBar from "components/common/SearchBar";
import PlayerImage from "components/common/images/PlayerImage";
import PlayerStats from "components/PlayerStats";
import Select from "components/common/Select";
import DetailBody from "./DetailBody";

import usePlayers from "hooks/usePlayers";
import useSearchPlayer from "hooks/useSearchPlayer";

import styles from "./PlayerDetail.module.css";
import useTeams from "hooks/useTeams";

const PlayerDetail = () => {
  const { t } = useTranslation();
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
    filteredTeams: [teamA, teamB],
  } = useTeams({
    key: "teamId",
    value: [player?.teamId, selectedSuggestion?.teamId],
  });

  useEffect(() => {
    handleReset();
  }, [handleReset, playerId]);

  const seasonYearsOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const yearsBetween = [
      {
        value: "careerSummary",
        name: t("common.all"),
      },
      {
        value: "latest",
        name: currentYear,
      },
    ];
    if (player?.nbaDebutYear) {
      for (let year = currentYear - 1; year >= +player?.nbaDebutYear; year--) {
        yearsBetween.push({ name: year, value: year });
      }
    }
    return yearsBetween;
  }, [player?.nbaDebutYear, t]);

  const handleSeasonYearChange = useCallback(({ target: { value } }) => {
    setSeasonStats(value);
  }, []);

  const players = useMemo(() => {
    const acc = [];
    player && acc.push(player);
    selectedSuggestion && acc.push(selectedSuggestion);
    return acc;
  }, [player, selectedSuggestion]);

  return (
    <section className={styles.container}>
      <section className={styles.playersContainer}>
        <article>
          <h3 className={styles.title}>{player?.temporaryDisplayName}</h3>
          <PlayerImage player={player} />
          <div>
            <div className={styles.seasonSelect}>
              <label htmlFor="season-year">{t("common.season")}: </label>
              <Select
                id="season-year"
                options={seasonYearsOptions}
                value={seasonStats}
                onChange={handleSeasonYearChange}
              />
            </div>
            <DetailBody teamA={teamA} teamB={teamB} player={player} />
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
                <DetailBody
                  teamA={teamA}
                  teamB={teamB}
                  player={selectedSuggestion}
                />
              </div>
            </>
          )}
        </article>
      </section>
      <PlayerStats players={players} season={seasonStats} />
    </section>
  );
};

export default PlayerDetail;
