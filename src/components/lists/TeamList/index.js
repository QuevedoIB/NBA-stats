import React from 'react'
import Proptypes from 'prop-types'

import TeamCard from 'components/cards/TeamCard'

import { teamProptypes } from 'components/types'

const TeamList = ({ list, division }) => {
  return (
    <article>
      <h3>{division}</h3>
      <ul>
        {list.map(team => (
          <TeamCard key={team.teamId} team={team} />
        ))}
      </ul>
    </article>
  )
}

TeamList.propTypes = {
  division: Proptypes.string.isRequired,
  list: Proptypes.arrayOf(teamProptypes).isRequired
}

export default TeamList
