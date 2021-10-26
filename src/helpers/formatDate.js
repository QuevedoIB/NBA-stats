export const formatDate = (date, language = "en", showHours = true) => {
  if (!date) return date;
  const parsedDate = new Date(date);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
    ...(showHours ? { hour: "2-digit", minute: "2-digit" } : {}),
  };
  return new Intl.DateTimeFormat(language, options).format(parsedDate);
};

export const parseMins = (t) => {
  const s = t.split(":");
  return Number(s[0]) * 60 + Number(s[1]);
};

export const parseMinsToString = (t) => {
  const minutes = Math.trunc(t / 60);
  let seconds = (t % 60).toFixed(2);
  if (seconds < 10) seconds = `0${seconds}`;
  return `${minutes}:${seconds}`;
};
