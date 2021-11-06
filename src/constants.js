// Time
export const SECOND_MILLISECONDS = 1000;
export const MINUTE_MILLISECONDS = 60_000;
export const HOUR_MILLISECONDS = 3_600_000;

export const NBA_PERIOD_AMOUNT = 4;
export const NBA_PERIOD_MINUTES = 12;
export const NBA_OVERTIME_MINUTES = 5;
export const NBA_OVERTIME_SECONDS =
  NBA_OVERTIME_MINUTES * (MINUTE_MILLISECONDS / SECOND_MILLISECONDS);
export const NBA_PERIOD_SECONDS =
  NBA_PERIOD_MINUTES * (MINUTE_MILLISECONDS / SECOND_MILLISECONDS);

// NBA API
export const MIN_DATE_DATA = "2014-10-28";

export const PLAY_BY_PLAY_EVENTS = {
  1: "gameEvents.shotScored",
  2: "gameEvents.shotMissed",
  3: "gameEvents.freeThrow",
  4: "gameEvents.rebound",
  5: "gameEvents.turnover",
  6: "gameEvents.foul",
  7: "gameEvents.violation", //EX: kicked ball
  8: "Substitution",
  9: "Team timeout",
  10: "gameEvents.possesion",
  11: "",
  12: "Start period",
  13: "End period",
  14: "",
  15: "",
  16: "",
  17: "",
  18: "Instant Replay - Overturn Ruling",
  19: "",
  20: "Stoppage: Out-of-Bounds",
};

export const POSITIVE_EVENTS = [1, 4, 10];
export const NEUTRAL_EVENTS = [8, 9, 12, 13, 18, 20];

//COLORS
export const COLORS = {
  POSITIVE: "#b6ed51",
  NEGATIVE: "#d6483e",
};
