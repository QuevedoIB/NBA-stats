import { useMemo } from "react";
import PropTypes from "prop-types";

import CollapseView from "components/common/CollapseView";
import GameCard from "components/cards/GameCard";
import Shimmer from "components/common/Shimmer";

import { teamProptypes, gamePropTypes } from "components/types";

import styles from "./Calendar.module.css";

const Calendar = ({ teams, calendar, isLoading }) => {
  const parsedIdTeams = useMemo(() => {
    return teams?.reduce((acc, team) => {
      acc[team.teamId] = team;
      return acc;
    }, {});
  }, [teams]);

  if (isLoading || !calendar?.length) return <Shimmer height="80vh" />;

  return (
    <section className={styles.container}>
      <CollapseView summary={<h3 className="title">Calendar</h3>}>
        <ul className={styles.calendarContainer}>
          {calendar?.map((game) => {
            return (
              <li key={game.gameId}>
                <GameCard teams={parsedIdTeams} game={game} />
              </li>
            );
          })}
        </ul>
      </CollapseView>
    </section>
  );
};

Calendar.propTypes = {
  teams: PropTypes.arrayOf(teamProptypes).isRequired,
  calendar: PropTypes.arrayOf(gamePropTypes),
  isLoading: PropTypes.bool,
};

export default Calendar;
