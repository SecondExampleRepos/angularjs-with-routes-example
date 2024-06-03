import moment from 'moment';

/**
 * Formats a date using the specified format and optional preprocessing.
 * 
 * @param date - The date to format.
 * @param format - The format to apply.
 * @param preprocess - Optional preprocessing method (e.g., 'utc', 'unix').
 * @returns The formatted date string.
 */
export function amDateFormat(date: any, format: string, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    let processedDate = preprocessDate(date, preprocess);
    let momentDate = moment(processedDate);

    return momentDate.isValid() ? momentDate.format(format) : '';
}

/**
 * Preprocesses the date based on the specified method.
 * 
 * @param date - The date to preprocess.
 * @param method - The preprocessing method (e.g., 'utc', 'unix').
 * @returns The preprocessed date.
 */
function preprocessDate(date: any, method?: string): any {
    if (!method) {
        return date;
    }

    switch (method) {
        case 'utc':
            return moment.utc(date);
        case 'unix':
            return moment.unix(date);
        default:
            console.warn(`Unsupported preprocess method: ${method}`);
            return date;
    }
}