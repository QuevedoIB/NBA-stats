const Select = ({ options, selected, ...props }) => {
  return (
    <select {...props}>
      {options.map((option, i) => (
        <option key={`${option.value}${i}`} {...option}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
