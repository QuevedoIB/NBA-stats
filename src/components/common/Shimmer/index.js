import { Children, cloneElement } from "react";
import PropTypes from "prop-types";

import styles from "./Shimmer.module.css";

const Shimmer = ({ children, height = "100%", width = "100%" }) => {
  return (
    <>
      {children ? (
        Children?.map(children, (child) =>
          cloneElement(child, {
            className: `${child.props.className} ${styles.shimmer}`,
          })
        )
      ) : (
        <div className={styles.shimmer} style={{ height, width }} />
      )}
    </>
  );
};

Shimmer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Shimmer;
