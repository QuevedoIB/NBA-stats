import React from "react";

import styles from "./Shimmer.module.css";

const Shimmer = ({ children, height = "100%", width = "100%" }) => {
  return (
    <>
      {children ? (
        React.Children?.map(children, (child) =>
          React.cloneElement(child, {
            className: `${child.props.className} ${styles.shimmer}`,
          })
        )
      ) : (
        <div className={styles.shimmer} style={{ height, width }} />
      )}
    </>
  );
};

export default Shimmer;
