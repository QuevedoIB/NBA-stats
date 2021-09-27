import React, { useRef } from "react";

import useAccordion from "hooks/useAccordion";

import styles from "./CollapseView.module.css";

const CollapseView = ({ summary, children, open = true }) => {
  const detailsRef = useRef(null);
  const summaryRef = useRef(null);
  const { toggleAccordion } = useAccordion({
    detailsRef,
    summaryRef,
  });

  return (
    <details ref={detailsRef} open={open}>
      <summary id={styles.summary} ref={summaryRef} onClick={toggleAccordion}>
        {summary}
      </summary>
      {children}
    </details>
  );
};

export default CollapseView;
