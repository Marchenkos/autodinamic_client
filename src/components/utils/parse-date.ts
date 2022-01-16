export const parseDate = (date: Date): string => {
    const dateFormat = new Date(date);

    const month = dateFormat.getMonth() + 1;
    const day = dateFormat.getDate();

    return `${day < 10 ? `0${day}` : day}.${
        month < 10 ? `0${month}` : month
    } ${dateFormat.getHours()}:${dateFormat.getMinutes()}`;
};

export const parseDateWithoutTime = (date: Date): string => {
    const dateFormat = new Date(date);

    const month = dateFormat.getMonth() + 1;
    const day = dateFormat.getDate();

    return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}`;
};

export const parseDateWithYear = (date: Date): string => {
    const dateFormat = new Date(date);

    const month = dateFormat.getMonth() + 1;
    const day = dateFormat.getDate();
    const year = dateFormat.getFullYear();

    return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;
};
