import React from 'react';

import FallbackImage from 'public/images/player-placeholder.png';

import './PlayerCard.css';

const PlayerCard = ({ player }) => {
    console.log(player);
    return (
        <li className="player-card-container">
            <img
                className="player-card-image"
                src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`}
                alt={`${player.temporaryDisplayName}`}
                onError={e => {
                    e.target.onerror = null;
                    e.target.src = FallbackImage;
                }}
            />
        </li>
    );
};

export default PlayerCard;
