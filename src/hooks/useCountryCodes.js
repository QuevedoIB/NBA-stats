import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import CountriesService from 'services/CountriesService';

import { HOUR_MILLISECONDS } from 'constants.js';

export function useCountryCodes({ countryName, countryCode }) {
    const [countryData, setCountryData] = useState();

    const { data: countries } = useQuery(
        'fetch-countries',
        async () => {
            const response = await CountriesService.fetchCountryCodes();
            return response?.data;
        },
        {
            staleTime: HOUR_MILLISECONDS,
        }
    );

    useEffect(() => {
        if (!countries) return;
        const matchCountry = countries.find(
            ({ Name, Code }) =>
                Name ===
                    (countryName === 'USA' ? 'United States' : countryName) ||
                Code === countryCode
        );
        setCountryData(matchCountry);
    }, [countryName, countryCode, countries]);

    return { countries, code: countryData?.Code, name: countryData?.Name };
}
