import PropTypes from "prop-types";

export const playerProptypes = PropTypes.shape({
  collegeName: PropTypes.string,
  country: PropTypes.string.isRequired,
  dateOfBirthUTC: PropTypes.string.isRequired,
  draft: PropTypes.shape({
    teamId: PropTypes.string.isRequired,
    pickNum: PropTypes.string.isRequired,
    roundNum: PropTypes.string,
    seasonYear: PropTypes.string.isRequired,
  }),
  firstName: PropTypes.string.isRequired,
  heightFeet: PropTypes.string,
  heightInches: PropTypes.string,
  heightMeters: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  jersey: PropTypes.string.isRequired,
  lastAffiliation: PropTypes.string,
  lastName: PropTypes.string.isRequired,
  nbaDebutYear: PropTypes.string.isRequired,
  personId: PropTypes.string.isRequired,
  pos: PropTypes.string.isRequired,
  teamId: PropTypes.string.isRequired,
  teamSitesOnly: PropTypes.shape({
    playerCode: PropTypes.string.isRequired,
    posFull: PropTypes.string.isRequired,
    displayAffiliation: PropTypes.string,
    freeAgentCode: PropTypes.string,
  }),
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      seasonEnd: PropTypes.string,
      seasonStart: PropTypes.string.isRequired,
      teamId: PropTypes.string,
    })
  ),
  temporaryDisplayName: PropTypes.string.isRequired,
  weightKilograms: PropTypes.string.isRequired,
  weightPounds: PropTypes.string,
  yearsPro: PropTypes.string.isRequired,
});

export const teamProptypes = PropTypes.shape({
  altCityName: PropTypes.string,
  city: PropTypes.string.isRequired,
  confName: PropTypes.string.isRequired,
  divName: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  isAllStar: PropTypes.bool.isRequired,
  isNBAFranchise: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
  teamId: PropTypes.string.isRequired,
  teamShortName: PropTypes.string.isRequired,
  tricode: PropTypes.string.isRequired,
  urlName: PropTypes.string.isRequired,
});

export const gamePropTypes = PropTypes.shape({
  gameId: PropTypes.string.isRequired,
  hTeam: PropTypes.shape({
    score: PropTypes.string.isRequired,
    teamId: PropTypes.string.isRequired,
  }),
  vTeam: PropTypes.shape({
    score: PropTypes.string.isRequired,
    teamId: PropTypes.string.isRequired,
  }),
  startTimeUTC: PropTypes.string.isRequired,
  startDateEastern: PropTypes.string.isRequired,
});
