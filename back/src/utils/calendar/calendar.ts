import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import {InvalidMonthError} from "@/utils/calendar/errors";
import {ICurrentWeek} from "@/utils/calendar/types";

export class Calendar {
    
    public static formats = {
        american: 'YYYY-MM-DD',
        brazilian: 'DD-MM-YYYY',
    }

    today() {
        const today = dayjs()

        return {
            format: today.format('YYYY-MM-DD'),
            year: today.year(),
            month: today.month() + 1,
            date: today.date(),
        }
    }

    // todo - tratar ano bissexto passando param year
    daysInMonth(month: number, year: number = null) {
        if (month < 0 || month > 11) throw new InvalidMonthError(month)

        year = year ?? new Date().getFullYear();

        const gen =  dayjs(`${year}-${month+1}-01`)

        console.log(gen.format(Calendar.formats.american))
        console.log(gen.daysInMonth())
    }

    weekByDate(ymdStr?: string): ICurrentWeek {
        dayjs.extend(weekOfYear)

        const current = (ymdStr) ? dayjs(ymdStr): dayjs();

        const sunday = current.startOf('week');
        const saturday = current.endOf('week');

        console.log('considered year')
        console.log(current.year())

        return {
            starts: {
                date: sunday.date(),
                month: sunday.month()
            },
            ends: {
                date: saturday.date(),
                month: saturday.month()
            },
            currentDay: current.day(),
            weekOfYear: current.week()
        }
    }
}