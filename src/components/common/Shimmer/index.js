import React from "react";

import styles from "./Shimmer.module.css";

const Shimmer = (children) => {
  return (
    <>
      {children.length
        ? React.Children?.map(children, (child) =>
            React.cloneElement(child, {
              className: `${child.props.className} ${styles.shimmer}`,
            })
          )
        : null}
    </>
  );
};

export default Shimmer;
