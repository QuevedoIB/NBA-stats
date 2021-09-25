import React, { useMemo, useCallback } from "react";
import i18n from "i18n";
import { useTranslation } from "react-i18next";

import styles from "./LanguageSelector.module.css";

const LanguagesList = ({ languageOptions }) => {
  const [t] = useTranslation();

  const handleLanguageChange = useCallback(async (language) => {
    if (language !== i18n.language) await i18n.changeLanguage(language);
  }, []);

  const options = useMemo(
    () =>
      Object.entries(languageOptions).map(([key, Flag]) => (
        <li key={key} onClick={() => handleLanguageChange(key)}>
          <Flag /> <p>{t(`languages.${key}`)}</p>
        </li>
      )),
    [handleLanguageChange, languageOptions, t]
  );
  return <ul className={styles.optionsContainer}>{options}</ul>;
};

export default LanguagesList;
