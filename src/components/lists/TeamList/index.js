import React from 'react';

import TeamCard from 'components/cards/TeamCard';

const TeamList = ({ division, teams }) => {
    return (
        <article>
            <h3>{division}</h3>
            <ul>
                {teams.map(team => (
                    <TeamCard key={team.teamId} team={team} />
                ))}
            </ul>
        </article>
    );
};

export default TeamList;
