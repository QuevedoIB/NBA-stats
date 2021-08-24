import React, { useMemo, useCallback, useState } from 'react';
import i18n from 'i18n';
import { useTranslation } from 'react-i18next';

import { ReactComponent as EnglishFlag } from 'public/images/united-kingdom-flag.svg';
import { ReactComponent as SpanishFlag } from 'public/images/spain-flag.svg';

import './LanguageSelector.css';

const languageOptions = {
    en: EnglishFlag,
    es: SpanishFlag,
};

const LanguageSelector = () => {
    const [t] = useTranslation();
    const [displayedOptions, setDisplayedOptions] = useState(false);
    const toggleLanguageOptions = () => setDisplayedOptions(!displayedOptions);
    const handleLanguageChange = useCallback(async language => {
        await i18n.changeLanguage(language);
    }, []);
    const options = useMemo(
        () =>
            Object.entries(languageOptions).map(([key, Flag]) => (
                <li key={key} onClick={() => handleLanguageChange(key)}>
                    <Flag /> <p>{t(`languages.${key}`)}</p>
                </li>
            )),
        [handleLanguageChange, t]
    );
    const SelectedLanguage = useMemo(
        () => languageOptions[i18n.language],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [i18n.language]
    );
    return (
        <div
            className="language-selector-container"
            onClick={toggleLanguageOptions}
        >
            <SelectedLanguage />
            {displayedOptions && (
                <ul className="language-selector-options-container">
                    {options}
                </ul>
            )}
        </div>
    );
};

export default LanguageSelector;
