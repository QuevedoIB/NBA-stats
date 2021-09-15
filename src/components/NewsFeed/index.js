import React from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import i18n from 'i18n';

import Spinner from 'components/common/Spinner';

import useErrorHandler from 'hooks/useErrorHandler';

import { HOUR_MILLISECONDS } from 'constants.js';

import NewsFeedService from 'services/NewsFeedService';

const NewsFeed = () => {
    const [t] = useTranslation();

    const { isLoading, error, data } = useQuery(
        `fetch-news-${i18n.language}`,
        async () => {
            console.log('REQUEST');
            const { data } = await NewsFeedService.fetchNews(i18n.language);
            return data;
        },
        {
            staleTime: HOUR_MILLISECONDS,
        }
    );
    useErrorHandler(error?.message);

    console.log(data);

    return (
        <section>
            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    <h3>{data.header}</h3>
                    {data.articles?.map((article, i) => {
                        return (
                            <article key={`${article.headline}${i}`}>
                                <h5>{article.headline}</h5>
                                {article.images?.[0] && (
                                    <img
                                        style={{ width: '10rem' }}
                                        loading="lazy"
                                        src={article.images[0]?.url}
                                        alt={article.images[0]?.caption}
                                    />
                                )}
                                <p>{article.description}</p>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default NewsFeed;
