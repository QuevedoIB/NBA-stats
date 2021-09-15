import React from 'react';

import StandingsTable from 'components/StandingsTable';
import GamesResult from 'components/GamesResult';
import NewsFeed from 'components/NewsFeed';

const Home = () => {
    return (
        <div className="home-container">
            <StandingsTable />
            <GamesResult />
            <NewsFeed />
        </div>
    );
};

export default Home;
