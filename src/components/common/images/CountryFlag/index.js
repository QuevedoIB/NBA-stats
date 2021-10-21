import useCountryCodes from "hooks/useCountryCodes";

import styles from "./CountryFlag.module.css";

const CountryFlag = ({ player }) => {
  const { code: countryFlagCode } = useCountryCodes({
    countryName: player.country,
  });
  if (!countryFlagCode) return null;

  const onIconLoadError = (e) => {
    e.target.onerror = null;
    e.target.src = `https://flagcdn.com/24x18/${countryFlagCode.toLowerCase()}.png`; //Fallback flags source
  };

  return (
    <img
      className={styles.countryIcon}
      src={`https://www.countryflags.io/${countryFlagCode}/flat/24.png`}
      onError={onIconLoadError}
      alt="country"
      loading="lazy"
      title={player.country}
    />
  );
};

export default CountryFlag;
