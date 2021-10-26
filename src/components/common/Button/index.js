import React from "react";
import Proptypes from "prop-types";

import styles from "./Button.module.css";

const Button = ({
  role = "primary",
  onClick,
  type = "button",
  text,
  classes = "",
  children,
}) => {
  return (
    <button
      className={`${styles.container} ${styles[role]} ${classes}`}
      type={type}
      onClick={onClick}
    >
      {children || text}
    </button>
  );
};

Button.propTypes = {
  role: Proptypes.oneOf(["primary", "secondary"]),
  onClick: Proptypes.func.isRequired,
  type: Proptypes.oneOf(["button, submit"]),
  text: Proptypes.string,
  classes: Proptypes.string,
  children: Proptypes.elementType,
};

export default Button;
