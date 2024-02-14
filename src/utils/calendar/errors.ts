export abstract class CalendarError extends Error {}

export class InvalidMonthError extends CalendarError {
    constructor(invalidMonth: number) {
        super(`Month number ${invalidMonth} isn't between 0 and 11`);
    }
}
