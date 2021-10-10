import React, { useMemo } from "react";

import TeamList from "components/lists/TeamList";
import Shimmer from "components/common/Shimmer";

import useTeams from "hooks/useTeams";

import styles from "./Teams.module.css";

const Teams = () => {
  const { teams, isLoading } = useTeams();
  const teamsGroupedByDivision = useMemo(
    () =>
      teams?.reduce((acc, curr) => {
        acc[curr.divName]
          ? acc[curr.divName].push(curr)
          : (acc[curr.divName] = [curr]);
        return acc;
      }, {}),
    [teams]
  );

  return (
    <section className={styles.container}>
      {isLoading || !teamsGroupedByDivision
        ? new Array(6).fill().map((_, i) => <Shimmer key={i} height="40vh" />)
        : Object.entries(teamsGroupedByDivision).map(([division, teams]) => (
            <TeamList key={division} division={division} list={teams} />
          ))}
    </section>
  );
};

export default Teams;
