import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import PlaceholderImage from 'public/images/player-placeholder.png';

import './PlayerCard.css';

import { formatDate } from 'helpers/formatDate';
import CountriesService from 'services/CountriesService';

import { HOUR_MILLISECONDS } from 'constants.js';

const PlayerCard = ({ player }) => {
    const { i18n } = useTranslation();
    const [imageSource, setImageSource] = useState();
    const { data: countries } = useQuery(
        'fetch-countries',
        async () => {
            const response = await CountriesService.fetchCountryCodes();
            return response?.data;
        },
        {
            staleTime: HOUR_MILLISECONDS, // only eligible to refetch after 10 seconds
        }
    );

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

    const countryFlagCode = useMemo(() => {
        if (!countries) return;
        return countries.find(
            ({ Name }) =>
                Name ===
                (player.country === 'USA' ? 'United States' : player.country)
        )?.Code;
    }, [countries, player.country]);

    return (
        <li className="player-card-container">
            <img
                src={imageSource ?? PlaceholderImage}
                alt={`${player.temporaryDisplayName}`}
                className={`player-card-image ${
                    imageSource ? 'placeholder-image' : ''
                }`}
            />
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
                        />
                    )}
                </div>
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
