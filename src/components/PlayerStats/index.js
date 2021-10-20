import { useMemo } from "react";
import { useQuery } from "react-query";

import RadarChart from "components/common/RadarChart";

import NbaService from "services/NbaService";
import { HOUR_MILLISECONDS } from "constants.js";

import styles from "./PlayerStats.module.css";

const PlayerStats = ({ playerA, playerB, season }) => {
  const { isLoading, data } = useQuery(
    `fetch-${playerA?.personId}-profile`,
    async () => {
      if (!playerA?.personId) return;
      const { stats } = await NbaService.fetchPlayerStats(playerA?.personId);

      return stats;
    },
    {
      staleTime: HOUR_MILLISECONDS,
    }
  );

  const { data: selectedSuggestionStats } = useQuery(
    `fetch-${playerB?.personId}-profile`,
    async () => {
      if (!playerB) return;
      const { stats } = await NbaService.fetchPlayerStats(playerB?.personId);

      return stats;
    },
    {
      staleTime: HOUR_MILLISECONDS,
    }
  );

  const chartsData = useMemo(() => {
    if (isLoading || !data) return;
    console.log(data, "DATA");
    const shootPercentLabels = {
      tpp: "3pts",
      ftp: "2pts",
      fgp: "1pts",
    };
    const overallLabels = {
      ppg: "Puntos",
      rpg: "Rebotes",
      apg: "Asistencias",
      bpg: "Tapones",
      spg: "Robos",
    };

    const getStats = (apiData) =>
      apiData?.[season] ||
      apiData.regularSeason.season.find((e) => e.seasonYear === +season)?.total;

    const playerAstats = getStats(data);
    const playerBstats =
      selectedSuggestionStats && getStats(selectedSuggestionStats);

    const generateData = (labels) =>
      Object.entries(labels).map(([key, subject]) => ({
        subject,
        playerA: +playerAstats[key],
        playerB: playerBstats ? +playerBstats?.[key] : 0,
      }));

    const generateDomain = (values, percent) => {
      const amounts = values.flatMap((e) =>
        e.playerB ? [e.playerA, e.playerB] : [e.playerA]
      );
      const max = Math.max(...amounts);
      const roundValue = percent ? 100 : 1;
      return [[0, Math.ceil(max / roundValue) * roundValue], values];
    };

    const overall = generateData(overallLabels).map((e) => ({
      ...e,
      playerA: (e.playerA / playerAstats.mpg).toFixed(2),
      playerB: playerBstats
        ? (e.playerB / playerBstats.mpg).toFixed(2)
        : e.playerB,
    }));

    console.log(overall, "OVERALL");

    return {
      shootPercentData: generateDomain(generateData(shootPercentLabels), true),
      overallData: generateDomain(overall),
    };
  }, [data, isLoading, season, selectedSuggestionStats]);

  console.log(chartsData, selectedSuggestionStats);

  if (!chartsData) return null;

  return (
    <section className={styles.chartsContainer}>
      {Object.entries(chartsData).map(([key, [domain, data]]) => (
        <div className={styles.chart} key={key}>
          <RadarChart
            data={data}
            domain={domain}
            playerA={playerA}
            playerB={playerB}
          />
        </div>
      ))}
    </section>
  );
};

export default PlayerStats;
