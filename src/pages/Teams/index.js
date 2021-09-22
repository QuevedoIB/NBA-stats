import React, { useMemo } from 'react'

import TeamList from 'components/lists/TeamList'
import Spinner from 'components/common/Spinner'

import  useTeams  from 'hooks/useTeams'

import styles from './Teams.module.css'

const Teams = () => {
  const { teams, isLoading } = useTeams()
  const teamsGroupedByDivision = useMemo(
    () =>
      teams?.reduce((acc, curr) => {
        acc[curr.divName]
          ? acc[curr.divName].push(curr)
          : (acc[curr.divName] = [curr])
        return acc
      }, {}),
    [teams]
  )

  return isLoading || !teamsGroupedByDivision
    ? (
      <Spinner />
      )
    : (
      <section className={styles.container}>
        {Object.entries(teamsGroupedByDivision).map(([division, teams]) => (
          <TeamList key={division} division={division} list={teams} />
        ))}
      </section>
      )
}

export default Teams
