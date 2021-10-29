import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import NewsCard from "components/cards/NewsCard";

import useErrorHandler from "hooks/useErrorHandler";

import { HOUR_MILLISECONDS } from "constants.js";

import NewsFeedService from "services/NewsFeedService";

import styles from "./NewsFeed.module.css";
import CollapseView from "components/common/CollapseView";
import Shimmer from "components/common/Shimmer";

const NewsFeed = () => {
  const [t] = useTranslation();
  const { isLoading, error, data } = useQuery(
    `fetch-news-${t("code")}`,
    async () => {
      const { data } = await NewsFeedService.fetchNews(t("code"));
      return data;
    },
    {
      staleTime: HOUR_MILLISECONDS,
    }
  );
  useErrorHandler(error?.message);

  if (isLoading) return <Shimmer />;

  return (
    <section className={`border-container ${styles.container}`}>
      <CollapseView summary={<h3 className="title">{data.header}</h3>}>
        <ul className={styles.list}>
          {!data?.articles?.length ? (
            <li>
              <p className={styles.withoutDataPlaceholder}>
                {t("newsFeed.noResults")}
              </p>
            </li>
          ) : (
            data.articles.map((article, i) => {
              return (
                <li key={`${article.headline}${i}`}>
                  <NewsCard article={article} />
                </li>
              );
            })
          )}
        </ul>
      </CollapseView>
    </section>
  );
};

export default NewsFeed;
