import { useCallback, useMemo } from "react";
import { useQueries } from "react-query";

import NbaService from "services/NbaService";
import { HOUR_MILLISECONDS } from "constants.js";

export default function usePlayerStats({
  season,
  labelKey = "subject",
  players,
}) {
  const playerQueries = useQueries(
    players.map((player) => {
      return {
        queryKey: ["fetch-profile", player.personId],
        queryFn: async () => {
          const { stats } = await NbaService.fetchPlayerStats(player?.personId);
          return { stats, player };
        },
        staleTime: HOUR_MILLISECONDS,
      };
    })
  );

  const getStats = useCallback(
    (apiData) =>
      apiData &&
      (apiData?.[season] ||
        apiData.regularSeason.season.find((e) => e.seasonYear === +season)
          ?.total),
    [season]
  );

  const generateDomain = useCallback(
    ({ values, roundValue = 1 }) => {
      if (!values) return [];
      const amounts = values.flatMap(
        ({ [labelKey]: subject, ...playerValues }) =>
          Object.values(playerValues)
      );
      const max = Math.max(...amounts);
      const min = Math.min(0, ...amounts);
      const round = (val) => {
        const operator = (val < 0 ? -1 : 1) * roundValue;
        return Math.ceil(val / operator) * operator;
      };
      return [[round(min), round(max)], values];
    },
    [labelKey]
  );

  const generateData = useCallback(
    (labels) => {
      return Object.entries(labels).map(([key, subject]) => ({
        subject,
        ...playerQueries.reduce((acc, query) => {
          if (!query.isLoading && query.data) {
            acc[query.data.player.personId] =
              +getStats(query.data.stats)[key] || 0;
          }
          return acc;
        }, {}),
      }));
    },
    [getStats, playerQueries]
  );

  const isLoading = useMemo(
    () => playerQueries.every((query) => query.isLoading),
    [playerQueries]
  );

  return {
    isLoading,
    generateDomain,
    generateData,
    getStats,
    labelKey,
    queries: playerQueries,
  };
}
