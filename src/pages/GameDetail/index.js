import { useMemo } from "react";
import { useParams } from "react-router";
import { useQuery, useQueries } from "react-query";
import distinctColors from "distinct-colors";

import EmptyChart from "./EmptyChart";
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
  PLAY_BY_PLAY_EVENTS,
} from "constants.js";

import {
  ComposedChart,
  Line,
  Area,
  AreaChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  Cell,
  ResponsiveContainer,
} from "recharts";

const GameDetail = () => {
  const { gameId, date } = useParams();
  const teamsPalette = useMemo(() => distinctColors({ count: 2 }), []); //2 players is the max amount, to make palette dynamically use players array

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

  const { filteredTeams: teams } = useTeams({
    key: "teamId",
    value: data && [
      data.basicGameData.hTeam.teamId,
      data.basicGameData.vTeam.teamId,
    ],
  });

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

  // const playerNames = players?.reduce((acc, player) => {
  //   acc[player.personId] = player.temporaryDisplayName;
  //   return acc;
  // }, {});

  const ticks = players?.map((player) => player.personId);

  const playsData = useMemo(() => {
    if (!plays.length) return;

    const parsedData = plays.reduce((acc, { isSuccess, data }, i) => {
      if (!isSuccess || !data?.plays?.length) return acc;
      const period = i + 1;
      data.plays.forEach((play) => {
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
          player: play.personId,
          event: PLAY_BY_PLAY_EVENTS[play.eventMsgType],
          score: play.hTeamScore - play.vTeamScore,
          hScore: play.hTeamScore,
          vScore: play.vTeamScore,
          x: time,
          y: play.personId,
        });
      });

      return acc;
    }, []);

    return parsedData;
  }, [plays]);

  console.log(playsData);

  if (isLoading) return <Shimmer height="80vh" />;

  if (!data.stats) {
    return (
      <EmptyChart teams={teams} players={players} palette={teamsPalette} />
    );
  }

  const gradientOffset = () => {
    const dataMax = Math.max(...playsData.map((play) => play.score));
    const dataMin = Math.min(...playsData.map((play) => play.score));

    if (dataMax <= 0) {
      return 0;
    } else if (dataMin >= 0) {
      return 1;
    } else {
      return dataMax / (dataMax - dataMin);
    }
  };

  const off = gradientOffset();

  const colors = distinctColors({ count: 10 }); //ADJUST

  // const gameData =

  return (
    <section style={{ height: "100vh", width: "100vh" }}>
      <ResponsiveContainer>
        <ComposedChart
          width={600}
          height={400}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          data={playsData}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="time" type="number" />
          <YAxis
            dataKey="score"
            type="number"
            yAxisId="right"
            orientation="right"
            width={50}
          />
          <YAxis
            height={1000}
            yAxisId="left"
            dataKey="player"
            type="number"
            ticks={ticks}
            // name="playerName"
            allowDuplicatedCategory={false}
            interval={0}
            width={200}
          />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor={teamsPalette[0]} stopOpacity={1} />
              <stop offset={off} stopColor={teamsPalette[1]} stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="score"
            stroke="url(#splitColor)"
            fill="url(#splitColor)"
          />
          <Scatter yAxisId="left" dataKey="event" height={1000}>
            {playsData.map((entry, index) => {
              return <Cell key={`cell-${index}`} fill={colors[0]} />;
            })}
          </Scatter>
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
};

export default GameDetail;
