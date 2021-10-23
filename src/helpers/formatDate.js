export const formatDate = (date, language = "en") => {
  if (!date) return date;
  const parsedDate = new Date(date);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat(language, options).format(parsedDate);
};
