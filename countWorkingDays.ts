import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { HolidayDay, holidayDays } from './holidayTable';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Warsaw');

const isWeekendOrHoliday = (date: Dayjs): boolean => {
    const dayOfWeek: number = date.day();
    const dateString = date.format('YYYY-MM-DD');

    const isWeekend = (): boolean =>  dayOfWeek === 0 || dayOfWeek === 6;

    const isHoliday = (): boolean =>
      holidayDays.some(
        (holiday: HolidayDay) => holiday.holidayDate.slice(0, 10) === dateString
      );
    return isWeekend() || isHoliday();
};

export const countWorkingDays = (
    numberOfDaysToAdd: number = 14,
    dateStart: Dayjs = dayjs.tz(),
) => {
    if (!Number.isInteger(numberOfDaysToAdd) || numberOfDaysToAdd < 1) {
        throw new Error('Number of days to add must be a positive integer');
    }
    let nextDay: Dayjs = dateStart;

    while (numberOfDaysToAdd > 0) {
        nextDay = nextDay.add(1, 'day');
        if (!isWeekendOrHoliday(nextDay)) {
            numberOfDaysToAdd--;
        }
    }
    return nextDay.format("YYYY-MM-DD");
};

console.log(countWorkingDays(14));
