import PropTypes from "prop-types";

import styles from "./NewsCard.module.css";

const NewsCard = ({ article }) => {
  return (
    <article>
      <a href={article?.links?.web?.href} target="_blank" rel="noreferrer">
        <h5 className={styles.title}>{article.headline}</h5>
        {article.images?.[0] && (
          <img
            className={styles.image}
            loading="lazy"
            src={article.images[0]?.url}
            alt={article.images[0]?.caption}
          />
        )}
        <p className={styles.text}>{article.description}</p>
      </a>
    </article>
  );
};

NewsCard.propTypes = {
  article: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    links: PropTypes.shape({
      web: PropTypes.shape({
        href: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        caption: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

export default NewsCard;
