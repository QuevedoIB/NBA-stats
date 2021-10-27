import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useQuery, useQueries } from "react-query";
import distinctColors from "distinct-colors";
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Scatter,
  Cell,
  ResponsiveContainer,
} from "recharts";

import EmptyChart from "./EmptyChart";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";
import Shimmer from "components/common/Shimmer";

import useTeams from "hooks/useTeams";
import usePlayers from "hooks/usePlayers";
import useErrorHandler from "hooks/useErrorHandler";

import NbaService from "services/NbaService";

import { parseMins, parseMinsToString } from "helpers/formatDate";
import {
  HOUR_MILLISECONDS,
  NBA_PERIOD_SECONDS,
  NBA_OVERTIME_SECONDS,
  NBA_PERIOD_AMOUNT,
} from "constants.js";

import styles from "./GameDetail.module.css";

const GameDetail = () => {
  const { gameId, date } = useParams();
  const [tooltipData, setTooltipData] = useState();

  const updateTooltip = useCallback(
    ({ payload }, index) => {
      setTooltipData(index === tooltipData?.index ? null : { payload, index });
    },
    [tooltipData]
  );

  const { isLoading, error, data } = useQuery(
    `fetch-${date}-${gameId}`,
    async () => {
      const { data } = await NbaService.fetchGame({ gameId, date });
      return data;
    },
    {
      staleTime: HOUR_MILLISECONDS,
    }
  );
  useErrorHandler(error?.message);

  const scoreDomain = useMemo(() => {
    if (!data?.stats) return;
    const biggestScoreDiff =
      Math.ceil(
        Math.max(data.stats.hTeam.biggestLead, data.stats.vTeam.biggestLead) /
          10
      ) * 10;
    return [-biggestScoreDiff, biggestScoreDiff];
  }, [data]);

  const timerTicks = useMemo(() => {
    if (!data?.stats) return;

    const timerTicks = [];
    let periods = data.basicGameData.period.current;

    for (let i = 1; i <= NBA_PERIOD_AMOUNT; i++) {
      const seconds = i * NBA_PERIOD_SECONDS;
      timerTicks.push(seconds);
      periods--;
    }

    while (periods > 0) {
      timerTicks.push(
        NBA_OVERTIME_SECONDS + NBA_PERIOD_AMOUNT * NBA_PERIOD_SECONDS
      );
      periods--;
    }

    return timerTicks;
  }, [data]);

  const { filteredTeams: teams } = useTeams({
    key: "teamId",
    value: data && [
      data.basicGameData.hTeam.teamId,
      data.basicGameData.vTeam.teamId,
    ],
  });

  const teamsPalette = useMemo(
    () => distinctColors({ count: teams?.length }),
    [teams]
  );

  const { filteredPlayers: players } = usePlayers({
    key: "teamId",
    value: data && [
      data.basicGameData.hTeam.teamId,
      data.basicGameData.vTeam.teamId,
    ],
  });

  const plays = useQueries(
    new Array(data?.basicGameData?.period?.current || 0)
      .fill("")
      .map((_, i) => {
        const period = i + 1;
        return {
          queryKey: [`fetch-plays-${date}-${gameId}`, period],
          queryFn: async () => {
            const { data } = await NbaService.fetchPeriodPlays({
              date,
              gameId,
              period,
            });
            return data;
          },
          staleTime: HOUR_MILLISECONDS,
        };
      })
  );

  const isLoadingPlays = useMemo(
    () => plays.some((result) => result.isLoading),
    [plays]
  );

  const { parsedPlays, playerTicks, ticks } = useMemo(() => {
    if (isLoadingPlays || isLoading) return {};

    const isAscendingOrder =
      data?.basicGameData.hTeam.teamId.localeCompare(
        data?.basicGameData.vTeam.teamId
      ) > 0;

    const sortedPlayers = data.stats.activePlayers
      .slice()
      .sort((a, b) =>
        isAscendingOrder ? a.teamId - b.teamId : b.teamId - a.teamId
      );

    const playerNames = sortedPlayers.reduce((acc, player, index) => {
      acc[player.personId] = {
        index: index + 1,
        name: `${player.firstName} ${player.lastName}`,
      };
      return acc;
    }, {});

    const validateEventImpact = ({ eventMsgType, hasScoreChange }) => {
      if (+eventMsgType === 3 && hasScoreChange) return true;
      const positiveEvents = [1, 4, 10];
      //Review unnecessary events ex: substitution
      return positiveEvents.includes(+eventMsgType);
    };

    const parsedPlays = plays.reduce((acc, { isSuccess, data }, i) => {
      if (!isSuccess || !data?.plays?.length) return acc;
      const period = i + 1;
      data.plays.forEach((play) => {
        const { index, name } = playerNames[play.personId] || {};
        const isOvertime = period > NBA_PERIOD_AMOUNT;
        const periodDuration = isOvertime
          ? NBA_OVERTIME_SECONDS
          : NBA_PERIOD_SECONDS;
        const baseTime = isOvertime
          ? NBA_PERIOD_SECONDS * NBA_PERIOD_AMOUNT +
            (period - NBA_PERIOD_AMOUNT) * NBA_OVERTIME_SECONDS
          : periodDuration * period;
        const time = parseMinsToString(baseTime - parseMins(play.clock));

        acc.push({
          time: baseTime - parseMins(play.clock),
          name,
          event: play.eventMsgType,
          score: play.hTeamScore - play.vTeamScore,
          hScore: play.hTeamScore,
          vScore: play.vTeamScore,
          x: time,
          y: index || null,
          hasEvent: index,
          positive: index && validateEventImpact(play),
        });
      });

      return acc;
    }, []);

    const playersEntries = Object.entries(playerNames).map(
      ([_, { index, name }]) => [index, name]
    );

    const playerTicks = Object.fromEntries(playersEntries);

    return {
      parsedPlays,
      playerTicks,
      ticks: playersEntries.map((_, i) => i + 1),
    };
  }, [data, isLoading, isLoadingPlays, plays]);

  if (isLoading || isLoadingPlays) return <Shimmer height="80vh" />;

  if (!data.stats || !parsedPlays.length) {
    return (
      <EmptyChart teams={teams} players={players} palette={teamsPalette} />
    );
  }

  const gradientOffset = () => {
    const dataMax = Math.max(...parsedPlays.map((play) => play.score));
    const dataMin = Math.min(...parsedPlays.map((play) => play.score));

    if (dataMax <= 0) {
      return 0;
    } else if (dataMin >= 0) {
      return 1;
    } else {
      return dataMax / (dataMax - dataMin);
    }
  };

  const off = gradientOffset();
  const isMobile = window.innerWidth <= 600;

  return (
    <section>
      <section className={styles.graphContainer}>
        <ResponsiveContainer width={isMobile ? 800 : "100%"}>
          <ComposedChart
            width={600}
            height={400}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            data={parsedPlays}
          >
            <XAxis
              dataKey="time"
              type="number"
              domain={[0, timerTicks[timerTicks.length - 1]]}
              ticks={timerTicks}
              interval={0}
              tickFormatter={(_, i) => `Q${i + 1}`}
            />
            <YAxis
              dataKey="score"
              type="number"
              yAxisId="right"
              orientation="right"
              width={50}
              domain={scoreDomain}
              tickFormatter={(val) => Math.abs(+val)}
            />
            <YAxis
              yAxisId="left"
              dataKey="y"
              type="number"
              tickFormatter={(val) => playerTicks[val] || ""}
              interval={0}
              ticks={ticks}
              width={200}
            />
            <Tooltip
              content={
                <CustomTooltip
                  customContent={tooltipData}
                  gameData={data}
                  teamsPalette={teamsPalette}
                />
              }
            />
            <Legend
              verticalAlign="top"
              content={
                <CustomLegend
                  game={data?.basicGameData}
                  teams={teams}
                  teamsPalette={teamsPalette}
                />
              }
            />
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset={off}
                  stopColor={teamsPalette[0]}
                  stopOpacity={1}
                />
                <stop
                  offset={off}
                  stopColor={teamsPalette[1]}
                  stopOpacity={1}
                />
              </linearGradient>
            </defs>
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="score"
              stroke="url(#splitColor)"
              fill="url(#splitColor)"
            />
            <Scatter
              yAxisId="left"
              dataKey="event"
              height={1000}
              onMouseLeave={updateTooltip}
              onMouseEnter={updateTooltip}
            >
              {parsedPlays.map((entry, index) => {
                const hoveredStatus = index === tooltipData?.index;
                const dotColor = entry.positive ? "#b6ed51" : "#d6483e";
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={dotColor}
                    stroke={hoveredStatus ? dotColor : ""}
                    strokeWidth={8}
                  />
                );
              })}
            </Scatter>
          </ComposedChart>
        </ResponsiveContainer>
      </section>
    </section>
  );
};

export default GameDetail;
