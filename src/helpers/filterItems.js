export const filterItems = ({ filter, values }) => {
  if (!filter.value || !filter.key || !values) return;
  return values.filter((e) =>
    e[filter.key] === filter.value || Array.isArray(filter.value)
      ? filter.value.includes(e[filter.key]?.toLowerCase())
      : e[filter.key]?.toLowerCase()?.includes(filter.value?.toLowerCase())
  );
};
