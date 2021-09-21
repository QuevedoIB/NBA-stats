import React from 'react'

import styles from './NewsCard.module.css'

const NewsCard = ({ article }) => {
  return (
    <article>
      <a href={article?.links?.web?.href} target='_blank' rel='noreferrer'>
        <h5 className={styles.title}>{article.headline}</h5>
        {article.images?.[0] && (
          <img
            className={styles.image}
            loading='lazy'
            src={article.images[0]?.url}
            alt={article.images[0]?.caption}
          />
        )}
        <p className={styles.text}>{article.description}</p>
      </a>
    </article>
  )
}

export default NewsCard
