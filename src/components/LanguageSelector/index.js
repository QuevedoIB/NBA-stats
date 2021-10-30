import { useMemo, useCallback, useState, useRef } from "react";
import i18n from "i18n";
import { useTranslation } from "react-i18next";

import LanguagesList from "./LanguagesList";

import { ReactComponent as EnglishFlag } from "public/images/united-kingdom-flag.svg";
import { ReactComponent as SpanishFlag } from "public/images/spain-flag.svg";

import useOutsideClick from "hooks/useOutsideClick";

import styles from "./LanguageSelector.module.css";

const languageOptions = {
  en: EnglishFlag,
  es: SpanishFlag,
};

const LanguageSelector = () => {
  const [t] = useTranslation();
  const [displayedOptions, setDisplayedOptions] = useState(false);
  const containerRef = useRef();
  const toggleLanguageOptions = useCallback(
    () => setDisplayedOptions((toggleStatus) => !toggleStatus),
    []
  );
  const closeOptions = useCallback(() => setDisplayedOptions(false), []);
  const SelectedLanguage = useMemo(
    () => languageOptions[t("code")],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language]
  );
  useOutsideClick({ ref: containerRef, callback: closeOptions });

  return (
    <div
      data-testid="language-select"
      ref={containerRef}
      className={styles.container}
      onClick={toggleLanguageOptions}
    >
      <SelectedLanguage />
      {displayedOptions && <LanguagesList languageOptions={languageOptions} />}
    </div>
  );
};

export default LanguageSelector;
