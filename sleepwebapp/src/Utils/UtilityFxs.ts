/**
 * Converts date string to year/month/day - time format
 * @param dateString Represents datestring of datetime object
 * @returns string in the year/month/day - time format
 */
export const toLocalDateTime = (dateString: string) => {
    const date = new Date(dateString);
    //const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //const dayOfWeek = weekdays[date.getUTCDay()];
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const time = date.toISOString().slice(11,19);
    return `${year}/${month}/${day} - ${time}`;    
}