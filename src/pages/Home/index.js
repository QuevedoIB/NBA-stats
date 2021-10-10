import React from "react";

import StandingsTable from "components/StandingsTable";
import GamesResult from "components/GamesResult";
import NewsFeed from "components/NewsFeed";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <StandingsTable />
      <GamesResult />
      <NewsFeed />
    </div>
  );
};

export default Home;
