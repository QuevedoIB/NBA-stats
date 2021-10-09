import React from "react";

import styles from "./Shimmer.module.css";

const Shimmer = ({ children }) => {
  return (
    <>
      {React.Children.count(children) > 0 &&
        React.Children?.map(children, (child) =>
          React.cloneElement(child, {
            className: `${child.props.className} ${styles.shimmer}`,
          })
        )}
    </>
  );
};

export default Shimmer;
