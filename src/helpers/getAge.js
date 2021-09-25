export const getAge = (dateUTC) => {
  const birth = new Date(dateUTC).getTime();
  const today = new Date().getTime();
  return Math.ceil(Math.abs(today - birth) / (1000 * 60 * 60 * 24 * 365));
};
