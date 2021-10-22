import styles from "./Select.module.css";

const Select = ({ options, selected, ...props }) => {
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

export default Select;
