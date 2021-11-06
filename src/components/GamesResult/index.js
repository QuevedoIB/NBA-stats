import { useState, useMemo, useEffect } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import GameCard from "components/cards/GameCard";
import CollapseView from "components/common/CollapseView";
import Shimmer from "components/common/Shimmer";

import NbaService from "services/NbaService";

import { HOUR_MILLISECONDS, MIN_DATE_DATA } from "constants.js";

import { getCalendarRanges } from "helpers/formatDate";
import useErrorHandler from "hooks/useErrorHandler";
import useTeams from "hooks/useTeams";

import styles from "./GamesResult.module.css";
import Spinner from "components/common/Spinner";

const GamesResult = () => {
  const [t] = useTranslation();
  const [mounted, setMounted] = useState(false);
  const { teams } = useTeams();
  const { today, maxDate } = useMemo(() => getCalendarRanges(), []);
  const [date, setDate] = useState(today);
  const { isLoading, error, data } = useQuery(
    `fetch-${date}-games`,
    async () => {
      const [year, month, day] = date.split("-");
      const { data } = await NbaService.fetchDayGames(`${year}${month}${day}`);
      return data;
    },
    {
      staleTime: HOUR_MILLISECONDS,
    }
  );
  useErrorHandler(error?.message);

  useEffect(() => setMounted(true), [data]);

  const handleDateChange = ({ target: { value } }) => setDate(value);

  const handleClick = (e) => e.stopPropagation();

  const parsedIdTeams = useMemo(() => {
    return teams?.reduce((acc, team) => {
      acc[team.teamId] = team;
      return acc;
    }, {});
  }, [teams]);

  if (!mounted) return <Shimmer />;

  return (
    <section className={`${styles.container} border-container`}>
      <CollapseView
        summary={
          <h3 className={`title ${styles.title}`}>
            {t("gamesResult.title")}
            <input
              type="date"
              name="results-date"
              required
              value={date}
              min={MIN_DATE_DATA}
              max={maxDate}
              onChange={handleDateChange}
              onClick={handleClick}
            />
          </h3>
        }
      >
        <ul>
          {isLoading ? (
            <li>
              <Spinner />
            </li>
          ) : !data?.numGames ? (
            <li>
              <p>{t("gamesResult.noResults")}</p>
            </li>
          ) : (
            data.games.map((game) => {
              return (
                <li key={game.gameId}>
                  <GameCard teams={parsedIdTeams} game={game} />
                </li>
              );
            })
          )}
        </ul>
      </CollapseView>
    </section>
  );
};

export default GamesResult;
