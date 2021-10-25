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
  Area,
  XAxis,
  YAxis,
  //CartesianGrid,
  Tooltip,
  //Legend,
  Scatter,
  Cell,
  ResponsiveContainer,
} from "recharts";

function CustomTooltip({ payload, label, active }) {
  if (active && payload?.[0]?.payload.hasEvent) {
    //console.log(payload, label);
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
}

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

  const { parsedPlays, playerTicks, ticks } = useMemo(() => {
    if (!plays.length) return {};

    const sortedPlayers = players.slice().sort((a, b) => a.teamId - b.teamId);

    const playerNames = sortedPlayers.reduce((acc, player, index) => {
      acc[player.personId] = {
        index: index + 1,
        name: player.temporaryDisplayName,
      };
      return acc;
    }, {});

    const validateEventImpact = ({ eventMsgType, hasScoreChange }) => {
      if (+eventMsgType === 3 && hasScoreChange) return true;
      const positiveEvents = [1, 4, 10];
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
          event: PLAY_BY_PLAY_EVENTS[play.eventMsgType],
          score: play.hTeamScore - play.vTeamScore,
          hScore: play.hTeamScore,
          vScore: play.vTeamScore,
          x: time,
          y: index || 0,
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

    return { parsedPlays, playerTicks, ticks: playersEntries.map((_, i) => i) };
  }, [players, plays]);

  if (isLoading) return <Shimmer height="80vh" />;

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

  const colors = distinctColors({ count: 10 }); //ADJUST

  return (
    <section style={{ height: "100vh", width: "100vh" }}>
      <ResponsiveContainer>
        <ComposedChart
          width={600}
          height={400}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          data={parsedPlays}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
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
          <Tooltip content={<CustomTooltip />} />
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
            {parsedPlays.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.hasEvent
                      ? entry.positive
                        ? "#00802b"
                        : "#800000"
                      : "#00000000"
                  }
                />
              );
            })}
          </Scatter>
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
};

export default GameDetail;
