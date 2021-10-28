import useDarkMode from "hooks/useDarkMode";

import styles from "./ToggleTheme.module.css";

const ToggleTheme = () => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <div id={styles.container}>
      <input
        type="checkbox"
        id={styles.toggle}
        defaultChecked={theme === "dark"}
        onClick={toggleTheme}
      />
      <div className={styles.sun} />
      <div className={styles.moon} />
    </div>
  );
};

export default ToggleTheme;
