import React from 'react'
import { useQuery } from 'react-query'
import i18n from 'i18n'

import Spinner from 'components/common/Spinner'
import NewsCard from 'components/cards/NewsCard'

import useErrorHandler from 'hooks/useErrorHandler'

import { HOUR_MILLISECONDS } from 'constants.js'

import NewsFeedService from 'services/NewsFeedService'

import styles from './NewsFeed.module.css'

const NewsFeed = () => {
  const { isLoading, error, data } = useQuery(
        `fetch-news-${i18n.language}`,
        async () => {
          const { data } = await NewsFeedService.fetchNews(i18n.language)
          return data
        },
        {
          staleTime: HOUR_MILLISECONDS
        }
  )
  useErrorHandler(error?.message)

  return (
    <section className={`border-container ${styles.container}`}>
      {isLoading
        ? (
          <Spinner />
          )
        : (
          <>
            <h3 className={`title ${styles.title}`}>{data.header}</h3>
            <ul className={styles.list}>
              {data.articles?.map((article, i) => {
                return (
                  <li key={`${article.headline}${i}`}>
                    <NewsCard article={article} />
                  </li>
                )
              })}
            </ul>
          </>
          )}
    </section>
  )
}

export default NewsFeed
