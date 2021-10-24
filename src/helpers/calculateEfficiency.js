export const calculateEfficiency = (player) => {
  const {
    points,
    totReb,
    assists,
    steals,
    blocks,
    tpm,
    tpa,
    ftm,
    fta,
    fga,
    fgm,
    turnovers,
    pFouls,
  } = player;
  const parseSum = (arr) => arr.reduce((acc, curr) => acc + +curr, 0);
  const positiveValues = parseSum([points, totReb, assists, steals, blocks]);
  const negativeValues = parseSum([
    +tpa - +tpm,
    +fta - +ftm,
    +fga - +fgm,
    turnovers,
    pFouls,
  ]);
  return positiveValues - negativeValues;
};
