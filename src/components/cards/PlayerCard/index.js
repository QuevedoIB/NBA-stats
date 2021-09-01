import React from 'react';
import { useTranslation } from 'react-i18next';

import PlaceholderImage from 'public/images/player-placeholder.png';

import './PlayerCard.css';

import { formatDate } from 'helpers/formatDate';

const PlayerCard = ({ player }) => {
    const { i18n } = useTranslation();
    return (
        <li className="player-card-container">
            <img
                className="player-card-image"
                src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`}
                alt={`${player.temporaryDisplayName}`}
                onError={e => {
                    e.target.onerror = null;
                    e.target.src = PlaceholderImage;
                    e.target.className = 'player-card-image placeholder-image';
                }}
            />
            <div>
                <p className="player-card-title">
                    {player.temporaryDisplayName}
                </p>
                <p className="player-card-subtitle">
                    {formatDate(player.dateOfBirthUTC, i18n.language)}
                </p>
            </div>
        </li>
    );
};

export default PlayerCard;

// C F G

// base -> G
// escolta -> G
// alero -> F
// ala pivot -> F-C
// pivot -> C-F
