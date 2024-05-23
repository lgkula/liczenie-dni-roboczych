import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { HolidayDay, holidayDays } from './holidayTable';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Warsaw');

export const isWeekendOrHoliday = (date: Dayjs): boolean => {
    const dayOfWeek: number = date.day();
    const dateString = date.format('YYYY-MM-DD');

    const isWeekend = (): boolean =>  dayOfWeek === 0 || dayOfWeek === 6;

    const isHoliday = (): boolean =>
      holidayDays.some(
        (holiday: HolidayDay) => holiday.holidayDate.slice(0, 10) === dateString
      );
    return isWeekend() || isHoliday();
};
