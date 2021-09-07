import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import PlaceholderImage from 'public/images/player-placeholder.png';

import './PlayerCard.css';

import { formatDate } from 'helpers/formatDate';
import { useCountryCodes } from 'hooks/useCountryCodes';
import { useTeams } from 'hooks/useTeams';

const PlayerCard = ({ player }) => {
    const { i18n } = useTranslation();
    const [imageSource, setImageSource] = useState();
    const { code: countryFlagCode } = useCountryCodes({
        countryName: player.country,
    });
    const teams = useSelector(state => state.teams.teams);
    useTeams(!Object.keys(teams).length);

    const getImageSource = useCallback(() => {
        const downloadingImage = new Image();
        downloadingImage.onload = function () {
            setImageSource(this.src);
        };
        downloadingImage.src = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`;
    }, [player.personId]);

    useEffect(() => {
        getImageSource();
    }, [getImageSource]);

    const playerTeam = useMemo(
        () => teams?.find(team => team.teamId === player.teamId),
        [player.teamId, teams]
    );

    //{player.pos} -

    return (
        <li className="player-card-container">
            <img
                src={imageSource ?? PlaceholderImage}
                alt={`${player.temporaryDisplayName}`}
                className={`player-card-image ${
                    imageSource ? 'placeholder-image' : ''
                }`}
                loading="lazy"
            />
            <div className="player-card-info-container">
                <div>
                    <p className="player-card-title">
                        {player.temporaryDisplayName}
                    </p>
                    <p className="player-card-subtitle">
                        {formatDate(player.dateOfBirthUTC, i18n.language)}
                    </p>
                    <div className="player-card-country">
                        <p>{player.country}</p>
                        {countryFlagCode && (
                            <img
                                className="country-flag-icon"
                                src={`https://www.countryflags.io/${countryFlagCode}/flat/24.png`}
                                alt="country"
                                loading="lazy"
                            />
                        )}
                    </div>
                </div>
                {playerTeam && (
                    <div className="player-card-team-info">
                        <p>{playerTeam.fullName}</p>
                        <img
                            loading="lazy"
                            src={`https://cdn.nba.com/logos/nba/${playerTeam.teamId}/global/L/logo.svg`}
                            alt={`${playerTeam.fullName} logo`}
                        />
                    </div>
                )}
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
