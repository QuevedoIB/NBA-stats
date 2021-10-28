import Proptypes from "prop-types";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

Layout.propTypes = {
  children: Proptypes.oneOfType([
    Proptypes.node,
    Proptypes.arrayOf(Proptypes.node),
  ]),
};

export default Layout;
