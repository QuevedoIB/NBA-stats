import { useRef } from "react";
import PropTypes from "prop-types";

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

CollapseView.propTypes = {
  summary: PropTypes.node.isRequired,
  children: PropTypes.node,
  open: PropTypes.bool,
};

export default CollapseView;
