import React from "react";

import StandingsTable from "components/StandingsTable";
import GamesResult from "components/GamesResult";
import NewsFeed from "components/NewsFeed";

import styles from "./Home.module.css";

import Shimmer from "components/common/Shimmer";

const Home = () => {
  return (
    <div className={styles.container}>
      <Shimmer>
        <div stlye={{ height: "10px", width: "10px" }}></div>
      </Shimmer>
      <StandingsTable />
      <GamesResult />
      <NewsFeed />
    </div>
  );
};

export default Home;
