import React from 'react';

import TeamList from 'components/lists/TeamList';
import Spinner from 'components/common/Spinner';

import { useTeams } from 'hooks/useTeams';

const Teams = () => {
    const { teams, isLoading } = useTeams();

    return isLoading ? (
        <Spinner />
    ) : (
        <section className="teams-list-container">
            {Object.entries(teams).map(([division, teams]) => (
                <TeamList key={division} division={division} teams={teams} />
            ))}
        </section>
    );
};

export default Teams;
