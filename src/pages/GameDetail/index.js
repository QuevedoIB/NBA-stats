import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useQuery, useQueries } from "react-query";
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

import EmptyChart from "./EmptyChart";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";
import Shimmer from "components/common/Shimmer";
import renderDot from "./ScatterDot";

import useTeams from "hooks/useTeams";
import usePlayers from "hooks/usePlayers";
import useErrorHandler from "hooks/useErrorHandler";
import useWindowSize from "hooks/useWindowSize";

import NbaService from "services/NbaService";

import {
  getMaxScoreDiffRanges,
  getPeriodTicks,
  getPageColors,
  parseGameData,
  getGradientOffsets,
} from "helpers/gameData";
import { HOUR_MILLISECONDS } from "constants.js";

import styles from "./GameDetail.module.css";

const GameDetail = () => {
  const { gameId, date } = useParams();
  const [tooltipData, setTooltipData] = useState();
  const { width: windowWidth } = useWindowSize();

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

  const { filteredPlayers: players, players: allNBAplayers } = usePlayers({
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

  const { scoreDomain, timerTicks } = useMemo(() => {
    if (!data?.stats) return {};
    return {
      scoreDomain: getMaxScoreDiffRanges(
        data.stats.hTeam.biggestLead,
        data.stats.vTeam.biggestLead
      ),
      timerTicks: getPeriodTicks(data.basicGameData.period.current),
    };
  }, [data]);

  const teamsPalette = useMemo(() => getPageColors(), []);

  const { filteredTeams: teams } = useTeams({
    key: "teamId",
    value: data && [
      data.basicGameData.hTeam.teamId,
      data.basicGameData.vTeam.teamId,
    ],
  });

  const isLoadingPlays = useMemo(
    () => plays.some((result) => result.isLoading),
    [plays]
  );

  const { parsedPlays, playerTicks, ticks } = useMemo(() => {
    if (isLoadingPlays || isLoading || !data?.stats) return {};
    return parseGameData({ data, players: allNBAplayers, plays });
  }, [allNBAplayers, data, isLoading, isLoadingPlays, plays]);

  const gradientOffsets = useMemo(
    () => parsedPlays && getGradientOffsets(parsedPlays),
    [parsedPlays]
  );

  const updateTooltip = useCallback(
    ({ payload }, index) => {
      setTooltipData(index === tooltipData?.index ? null : { payload, index });
    },
    [tooltipData]
  );

  if (isLoading || isLoadingPlays) return <Shimmer height="80vh" />;

  if (!data?.stats || !parsedPlays?.length) {
    return (
      <EmptyChart teams={teams} players={players} palette={teamsPalette} />
    );
  }

  const isMobile = windowWidth <= 600;

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
                  offset={gradientOffsets}
                  stopColor={teamsPalette[0]}
                  stopOpacity={1}
                />
                <stop
                  offset={gradientOffsets}
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
              {parsedPlays.map((entry, index) =>
                renderDot({ entry, index, tooltip: tooltipData })
              )}
            </Scatter>
          </ComposedChart>
        </ResponsiveContainer>
      </section>
    </section>
  );
};

export default GameDetail;
