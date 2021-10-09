import React, { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import Spinner from "components/common/Spinner";
import GameCard from "components/cards/GameCard";

import NbaService from "services/NbaService";

import { HOUR_MILLISECONDS, MIN_DATE_DATA } from "constants.js";

import useErrorHandler from "hooks/useErrorHandler";
import useTeams from "hooks/useTeams";

import styles from "./GamesResult.module.css";
import CollapseView from "components/common/CollapseView";

const GamesResult = () => {
  const [t] = useTranslation();
  const { teams } = useTeams();
  const { today, maxDate } = useMemo(() => {
    const currentDate = new Date();
    let month = currentDate.getUTCMonth() + 1;
    let day = currentDate.getUTCDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return {
      today: `${currentDate.getUTCFullYear()}-${month}-${day}`,
      maxDate: `${currentDate.getUTCFullYear() + 1}-${month}-${day}`,
    };
  }, []);
  const [date, setDate] = useState(today);
  const { isLoading, error, data } = useQuery(
    `fetch-${date}-games`,
    async () => {
      const splittedDate = date.split("-");
      const { data } = await NbaService.fetchDayGames(
        `${splittedDate[0]}${splittedDate[1]}${splittedDate[2]}`
      );
      return data;
    },
    {
      staleTime: HOUR_MILLISECONDS,
    }
  );
  useErrorHandler(error?.message);

  const handleDateChange = ({ target: { value } }) => setDate(value);
  const handleClick = (e) => e.stopPropagation();

  const parsedIdTeams = useMemo(() => {
    return teams?.reduce((acc, team) => {
      acc[team.teamId] = team;
      return acc;
    }, {});
  }, [teams]);

  return (
    <section className={`${styles.container} border-container`}>
      <CollapseView
        summary={
          <h3 className={`title ${styles.title}`}>
            {t("gamesResult.title")}
            <input
              type="date"
              name="results-date"
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
            <Spinner />
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
