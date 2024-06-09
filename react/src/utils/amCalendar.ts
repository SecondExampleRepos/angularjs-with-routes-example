import moment from 'moment';

/**
 * Converts a date to a calendar format using moment.js.
 * 
 * @param date - The date to be converted.
 * @param preprocess - Optional preprocessing method.
 * @returns The date in calendar format or an empty string if the date is invalid.
 */
export function amCalendar(date: any, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    // Preprocess the date if a preprocess method is provided
    if (preprocess) {
        switch (preprocess) {
            case 'utc':
                date = moment.utc(date);
                break;
            case 'unix':
                date = moment.unix(date);
                break;
            default:
                console.warn(`Unsupported preprocess method: ${preprocess}`);
                break;
        }
    } else {
        date = moment(date);
    }

    const formattedDate = moment(date);
    return formattedDate.isValid() ? formattedDate.calendar() : '';
}