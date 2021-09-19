import React from 'react'
import { Link } from 'react-router-dom'

import styles from './TeamCard.module.css'

const TeamCard = ({
  team: {
    altCityName,
    city,
    confName,
    divName,
    fullName,
    isAllStar,
    nickname,
    teamId,
    teamShortName,
    tricode,
    urlName
  }
}) => {
  return (
    <div className={styles.container}>
      <Link to={`/team-detail/${teamId}`}>
        <img
          className={styles.logo}
          loading='lazy'
          src={`https://cdn.nba.com/logos/nba/${teamId}/global/L/logo.svg`}
          alt={`${fullName} logo`}
        />
        <div>
          <p>{fullName}</p>
        </div>
      </Link>
    </div>
  )
}

export default TeamCard
