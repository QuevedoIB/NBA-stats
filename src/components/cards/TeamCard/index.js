import React from 'react';

import './TeamCard.css';

const TeamCard = ({
    team: {
        altCityName,
        city,
        confName,
        divName,
        fullName,
        isAllStar,
        nickname,
        teamId,
        teamShortName,
        tricode,
        urlName,
    },
}) => {
    return (
        <div className="team-card-container">
            <a href="/players">
                <img
                    className="team-logo"
                    loading="lazy"
                    src={`https://cdn.nba.com/logos/nba/${teamId}/global/L/logo.svg`}
                    alt={`${fullName} logo`}
                />
                <div>
                    <p>{fullName}</p>
                </div>
            </a>
        </div>
    );
};

export default TeamCard;
