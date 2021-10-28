import styles from "./Select.module.css";

import PropTypes from "prop-types";

const Select = ({ options, ...props }) => {
  return (
    <select className={styles.containerSelect} {...props}>
      {options.map((option, i) => (
        <option key={`${option.value}${i}`} {...option}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export default Select;
