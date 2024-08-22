export const formatDate = (
    locales: Intl.LocalesArgument,
    date: string | number
) => {
    const options: Intl.DateTimeFormatOptions = {
        dateStyle: 'medium',
        timeStyle: 'short',
    };

    return Intl.DateTimeFormat(locales, options).format(new Date(date));
};
