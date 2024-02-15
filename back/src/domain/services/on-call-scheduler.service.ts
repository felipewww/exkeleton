import {OnCallEntity} from "@/domain/entities/on-call.entity";
import {Calendar} from "@/utils/calendar/calendar";
import {ScheduleRepo} from "@/domain/repos/schedule.repo";

/**
 * todo - e quando virar o ano? continuar contando 52 + 1+ 1+ 1?
 * todo - e quando adicionar uma dupla? módulo falha na conta do proximo
 *
 * semana 30 com 3 = grupo 0
 *
 * logo, 31 com 3 deveria ser grupo 1
 *
 * mas, se for 31 com 4 ficará grupo 3... pulou o 1 e 2
 *
 * 30 % 3 ["0",1,2,3]
 * 31 % 4 [0,1,2,"3",x]
 * 32 % 4 ["0",1,2,3,x]
 */

export class OnCallSchedulerService {
    constructor(
        private onCallGroups: Array<OnCallEntity>,
        private scheduleRepo: ScheduleRepo,
        private calendar: Calendar
    ) {
    }

    init() {
        console.log(this.onCallGroups)
        console.log('\n')

        console.log('init???'.cyan)
        // this.calendar.daysInMonth(MONTHS.FEB)
        // const weekInfo = this.calendar.weekByDate('2024-12-30');
        const weekInfo = this.calendar.weekByDate();

        const selectedGroup = this.selectedGroupForWeek(weekInfo.weekOfYear)

        console.log(weekInfo)
        console.log(selectedGroup)

        console.log('fake...')
        console.log(7 % 3)
        console.log(8 % 3)
        console.log(9 % 4)

        // this.calcWeeks()
    }

    calcWeeks() {
        console.log('calcweeks'.bgRed.white)

        // const weeks: Array<ISchedule> = []

        let totalWeeks = 52;
        // let duplas = 3;
        let weekIdx = 1;
        // let pairs = ['a','b','c']

        while (weekIdx <= totalWeeks) {
            let groupIdx = (weekIdx -1) % this.onCallGroups.length
            // let groupIdx = (weekIdx -1) % pairs.length

            // this.schedules.push({
            //     group: groupIdx,
            //     week: weekIdx,
            // })

            weekIdx++;


            // na semana 30, adicionou uma dupla.
            // if (weekIdx == 30) {
            //
            //     // calcular daqui pra frente, como se fosse ponto 0.
            //     totalWeeks = totalWeeks - weekIdx
            //     // weekIdx = (groupIdx === pairs.length-1) ? 0 : groupIdx + 1;
            //     weekIdx = 1;
            //     groupIdx = (groupIdx === pairs.length-1) ? 0 : groupIdx + 1;
            //
            //     pairs.push('d');
            // }
        }

        // console.log(this.schedules)
    }

    addGroup() {

    }

    selectedGroupForWeek(week: number) {
        const groupIndex = (week - 1) % this.onCallGroups.length;
        return this.onCallGroups[groupIndex];
    }
}
