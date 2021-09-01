export const formatDate = (date, language = 'en') => {
    const parsedDate = new Date(date);
    const year = new Intl.DateTimeFormat(language, { year: 'numeric' }).format(
        parsedDate
    );
    const month = new Intl.DateTimeFormat(language, { month: 'short' }).format(
        parsedDate
    );
    const day = new Intl.DateTimeFormat(language, { day: '2-digit' }).format(
        parsedDate
    );
    return `${day}-${month}-${year}`;
};
