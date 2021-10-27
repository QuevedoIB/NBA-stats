import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import distinctColors from "distinct-colors";

import RadarChart from "components/common/RadarChart";
import BarChart from "components/common/BarChart";

import usePlayerStats from "hooks/usePlayerStats";

import styles from "./PlayerStats.module.css";

const PlayerStats = ({ players, season }) => {
  const { t } = useTranslation();
  const {
    isLoading,
    generateData,
    generateDomain,
    labelKey,
    queries,
    getStats,
  } = usePlayerStats({
    season,
    players,
  });

  const playersPalette = useMemo(() => distinctColors({ count: 2 }), []); //2 players is the max amount, to make palette dynamically use players array

  const labels = useMemo(
    () => ({
      shootPercent: {
        tpp: t("stats.3pts"),
        fgp: t("stats.2pts"),
        ftp: t("stats.1pts"),
      },
      statsPerMinute: {
        ppg: t("stats.points"),
        rpg: t("stats.rebounds"),
        apg: t("stats.assists"),
        bpg: t("stats.blocks"),
        spg: t("stats.steals"),
      },
      overall: {
        assists: t("stats.assists"),
        blocks: t("stats.blocks"),
        steals: t("stats.steals"),
        turnovers: t("stats.turnovers"),
        offReb: t("stats.rebounds", { ending: "Ofensivos" }),
        defReb: t("stats.rebounds", { ending: "Defensivos" }),
        totReb: t("stats.rebounds", { ending: "Totales" }),
        pFouls: t("stats.fouls"),
        points: t("stats.points"),
        gamesPlayed: t("stats.games", { ending: "Totales" }),
        gamesStarted: t("stats.games", { ending: "Titular" }),
        plusMinus: t("stats.plusMinus"),
        min: t("stats.minutes"),
        dd2: t("stats.doubles"),
        td3: t("stats.triples"),
      },
    }),
    [t]
  );

  const stats = useMemo(() => {
    if (isLoading || !players?.length) return;
    const shoots = generateDomain({
      values: generateData(labels.shootPercent),
      roundValue: 100,
    });

    const overallMinutesData = generateData(labels.statsPerMinute);

    const parsedToMinutesValues = overallMinutesData?.map(
      ({ [labelKey]: subject, ...rest }) => ({
        [labelKey]: subject,
        ...Object.entries(rest).reduce((acc, [key, value]) => {
          const playerQuery = queries.find(
            (query) => query.data.player.personId === key
          );
          acc[key] = (value / getStats(playerQuery.data.stats).mpg).toFixed(2);
          return acc;
        }, {}),
      })
    );

    const overallMinutes = generateDomain({
      values: parsedToMinutesValues,
    });

    const overall = generateDomain({
      values: generateData(labels.overall),
      roundValue: 100,
    });

    return { shoots, overallMinutes, overall };
  }, [
    generateData,
    generateDomain,
    getStats,
    isLoading,
    labelKey,
    labels.overall,
    labels.shootPercent,
    labels.statsPerMinute,
    players?.length,
    queries,
  ]);

  if (!stats) return null;

  const {
    shoots: [shootDomain, shootData],
    overallMinutes: [overallMinutesDomain, overallMinutesData],
    overall: [overallDomain, overallData],
  } = stats;

  return (
    <section className={styles.chartsContainer}>
      <div className={styles.chart}>
        <h3 className={styles.chartTitle}>{t("stats.titles.percentChart")}</h3>
        <div>
          <RadarChart
            domain={shootDomain}
            data={shootData}
            players={players}
            labelKey={labelKey}
            palette={playersPalette}
          />
        </div>
      </div>
      <div className={styles.chart}>
        <h3 className={styles.chartTitle}>
          {t("stats.titles.overallPerMinute")}
        </h3>
        <div>
          <RadarChart
            domain={overallMinutesDomain}
            data={overallMinutesData}
            players={players}
            labelKey={labelKey}
            palette={playersPalette}
          />
        </div>
      </div>
      <div className={`${styles.chart} ${styles.barChart}`}>
        <h3 className={styles.chartTitle}>{t("stats.titles.overall")}</h3>
        <div>
          <BarChart
            domain={overallDomain}
            data={overallData}
            players={players}
            labelKey={labelKey}
            palette={playersPalette}
          />
        </div>
      </div>
    </section>
  );
};

export default PlayerStats;
