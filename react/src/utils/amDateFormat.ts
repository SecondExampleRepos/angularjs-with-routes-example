// react/src/utils/amDateFormat.ts

import moment from 'moment';

/**
 * Formats a date using the specified format and optional preprocessing.
 * 
 * @param date - The date to format.
 * @param format - The format to apply.
 * @param preprocess - Optional preprocessing method.
 * @returns The formatted date string.
 */
export function amDateFormat(date: any, format: string, preprocess?: string): string {
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
                console.warn(`Ignoring unsupported value for preprocess: ${preprocess}`);
                date = moment(date);
        }
    } else {
        date = moment(date);
    }

    // Check if the date is valid
    if (!date.isValid()) {
        return '';
    }

    // Apply the format and return the formatted date
    return date.format(format);
}