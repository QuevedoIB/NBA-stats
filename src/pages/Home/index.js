import React from 'react';

import StandingsTable from 'components/StandingsTable';
import GamesResult from 'components/GamesResult';

const Home = () => {
    return (
        <div className="home-container">
            <StandingsTable />
            <GamesResult />
        </div>
    );
};

export default Home;
