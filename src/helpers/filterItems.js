export const filterItems = ({ filter, values }) => {
  if (!filter.value || !filter.key || !values) return;
  return values.filter(
    (e) =>
      e[filter.key] === filter.value ||
      e[filter.key]?.toLowerCase()?.includes(filter.value?.toLowerCase())
  );
};
