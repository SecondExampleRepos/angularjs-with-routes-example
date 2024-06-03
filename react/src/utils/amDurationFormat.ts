import moment from 'moment';

/**
 * Formats a duration using moment.js
 * 
 * @param duration - The duration to format
 * @param units - The units of the duration (optional)
 * @param withSuffix - Whether to include a suffix (optional)
 * @returns The formatted duration string
 */
export function amDurationFormat(duration: any, units?: moment.unitOfTime.DurationConstructor, withSuffix?: boolean): string {
    if (typeof duration === 'undefined' || duration === null) {
        return '';
    }
    return moment.duration(duration, units).humanize(withSuffix);
}