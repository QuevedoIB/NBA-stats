import React from 'react'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import i18n from 'i18n'

import Spinner from 'components/common/Spinner'
import NewsCard from 'components/cards/NewsCard'

import useErrorHandler from 'hooks/useErrorHandler'

import { HOUR_MILLISECONDS } from 'constants.js'

import NewsFeedService from 'services/NewsFeedService'

import './NewsFeed.css'

const NewsFeed = () => {
  const [t] = useTranslation()

  const { isLoading, error, data } = useQuery(
        `fetch-news-${i18n.language}`,
        async () => {
          console.log('REQUEST')
          const { data } = await NewsFeedService.fetchNews(i18n.language)
          return data
        },
        {
          staleTime: HOUR_MILLISECONDS
        }
  )
  useErrorHandler(error?.message)

  console.log(data)

  return (
    <section className='border-container newsfeed-container'>
      {isLoading
        ? (
          <Spinner />
          )
        : (
          <>
            <h3 className='title'>{data.header}</h3>
            <ul className='newsfeed-list-container'>
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
