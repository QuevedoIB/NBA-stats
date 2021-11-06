import i18n from "i18n.js";

import { parseMins, parseMinsToString } from "./formatDate";

import {
  NBA_PERIOD_AMOUNT,
  NBA_PERIOD_SECONDS,
  NBA_OVERTIME_SECONDS,
  POSITIVE_EVENTS,
  NEUTRAL_EVENTS,
} from "constants.js";

export const getMaxScoreDiffRanges = (rangeA, rangeB) => {
  const roundValue = 10;
  const biggestScoreDiff =
    Math.ceil(Math.max(rangeA, rangeB) / roundValue) * roundValue;
  return [-biggestScoreDiff, biggestScoreDiff];
};

export const getPeriodTicks = (periodsAmount) => {
  const timerTicks = [];
  let periods = periodsAmount;

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
};

export const getPageColors = () => {
  const bodyStyles = getComputedStyle(document.body);
  return [
    bodyStyles.getPropertyValue("--primary-color"),
    bodyStyles.getPropertyValue("--secondary-color"),
  ];
};

const validateEventImpact = ({
  play: { eventMsgType, hasScoreChange },
  isPlayerEvent,
}) => {
  if (NEUTRAL_EVENTS.includes(+eventMsgType)) return {};
  const eventData = {
    y: isPlayerEvent,
    hasEvent: isPlayerEvent,
    positive:
      (+eventMsgType === 3 && hasScoreChange) ||
      POSITIVE_EVENTS.includes(+eventMsgType),
  };
  return eventData;
};

const getPlayerTicks = (playerNames) =>
  Object.fromEntries(
    Object.entries(playerNames).map(([_, { index, name }]) => [index, name])
  );

const sortPlayers = (data) => {
  const isAscendingOrder =
    data?.basicGameData.hTeam.teamId.localeCompare(
      data?.basicGameData.vTeam.teamId
    ) > 0;

  return data.stats.activePlayers
    .slice()
    .sort((a, b) =>
      isAscendingOrder ? a.teamId - b.teamId : b.teamId - a.teamId
    );
};

const getPlayerNames = ({ gamePlayers, nbaPlayers }) =>
  gamePlayers.reduce((acc, player, index) => {
    let name = `${player.firstName} ${player.lastName}`;
    /* 2018 players don't return firstName and lastName, some are retired or not NBA players anymore so no data available about their names */
    if (!player.firstName || !player.lastName) {
      const playerData = nbaPlayers.find((e) => e.personId === player.personId);
      name = playerData
        ? `${playerData?.firstName} ${playerData?.lastName}`
        : i18n.t("common.retired");
    }
    acc[player.personId] = {
      index: index + 1,
      name,
    };
    return acc;
  }, {});

export const parseGameData = ({ data, players, plays }) => {
  const sortedPlayers = sortPlayers(data);

  const playerNames = getPlayerNames({
    gamePlayers: sortedPlayers,
    nbaPlayers: players,
  });

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
        ...validateEventImpact({ play, isPlayerEvent: index }),
      });
    });

    return acc;
  }, []);

  return {
    parsedPlays,
    playerTicks: getPlayerTicks(playerNames),
    ticks: sortedPlayers.map((_, i) => i + 1),
  };
};

export const getGradientOffsets = (plays) => {
  const dataMax = Math.max(...plays.map((play) => play.score));
  const dataMin = Math.min(...plays.map((play) => play.score));

  if (dataMax <= 0) {
    return 0;
  } else if (dataMin >= 0) {
    return 1;
  } else {
    return dataMax / (dataMax - dataMin);
  }
};
