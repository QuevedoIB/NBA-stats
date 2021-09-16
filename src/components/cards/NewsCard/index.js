import React from 'react';

import './NewsCard.css';

const NewsCard = ({ article }) => {
    return (
        <article className="newscard-container">
            <h5 className="newscard-title">{article.headline}</h5>
            {article.images?.[0] && (
                <img
                    className="newscard-image"
                    loading="lazy"
                    src={article.images[0]?.url}
                    alt={article.images[0]?.caption}
                />
            )}
            <p className="newscard-text">{article.description}</p>
        </article>
    );
};

export default NewsCard;
