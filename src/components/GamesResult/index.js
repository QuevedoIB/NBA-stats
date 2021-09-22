import React, { useState, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'

import Spinner from 'components/common/Spinner'

import NbaService from 'services/NbaService'

import { HOUR_MILLISECONDS, MIN_DATE_DATA } from 'constants.js'

import useErrorHandler from 'hooks/useErrorHandler'
import  useTeams  from 'hooks/useTeams'

import styles from './GamesResult.module.css'

const GamesResult = () => {
  const [t] = useTranslation()
  const { teams } = useTeams()
  const { today, maxDate } = useMemo(() => {
    const currentDate = new Date()
    let month = currentDate.getUTCMonth() + 1
    let day = currentDate.getUTCDate()
    month = month < 10 ? `0${month}` : month
    day = day < 10 ? `0${day}` : day
    return {
      today: `${currentDate.getUTCFullYear()}-${month}-${day}`,
      maxDate: `${currentDate.getUTCFullYear() + 1}-${month}-${day}`
    }
  }, [])
  const [date, setDate] = useState(today)
  const { isLoading, error, data } = useQuery(
        `fetch-${date}-games`,
        async () => {
          const splittedDate = date.split('-')
          const { data } = await NbaService.fetchDayGames(
                `${splittedDate[0]}${splittedDate[1]}${splittedDate[2]}`
          )
          return data
        },
        {
          staleTime: HOUR_MILLISECONDS
        }
  )
  useErrorHandler(error?.message)

  const handleDateChange = ({ target: { value } }) => setDate(value)

  return (
    <section className={`${styles.container} border-container`}>
      <h3 className={`title ${styles.title}`}>
        {t('gamesResult.title')}
        <input
          type='date'
          name='results-date'
          value={date}
          min={MIN_DATE_DATA}
          max={maxDate}
          onChange={handleDateChange}
        />
      </h3>
      <ul>
        {isLoading
          ? (
            <Spinner />
            )
          : !data?.numGames
              ? (
                <li>
                  <p>{t('gamesResult.noResults')}</p>
                </li>
                )
              : (
                  data.games.map(game => {
                    const visitorTeam = teams.find(
                      ({ teamId }) => teamId === game.vTeam.teamId
                    )

                    const homeTeam = teams.find(
                      ({ teamId }) => teamId === game.hTeam.teamId
                    )
                    return (
                      <li key={game.gameId}>
                        <p>{`${homeTeam?.fullName} vs ${visitorTeam?.fullName}`}</p>
                        <p>{`${game.hTeam?.score} - ${game.vTeam?.score}`}</p>
                      </li>
                    )
                  })
                )}
      </ul>
    </section>
  )
}

export default GamesResult
