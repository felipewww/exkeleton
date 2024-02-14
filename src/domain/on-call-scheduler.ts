import {OnCallEntity} from "@/domain/entities/on-call.entity";
import {Calendar} from "@/utils/calendar/calendar";
import {MONTHS} from "@/utils/calendar/enums";

/**
 * todo - e quando virar o ano? continuar contando 52 + 1+ 1+ 1?
 * todo - e quando adicionar uma dupla? módulo falha na conta do proximo
 */

export class OnCallScheduler {
    private calendar: Calendar

    constructor(
        private onCallGroups: Array<OnCallEntity>
    ) {
        this.calendar = new Calendar()
    }

    init() {
        console.log(this.onCallGroups)
        console.log('\n')

        // const date = new Date();
        // console.log(date.getDate())
        // console.log(date.getMonth() + 1)


        // this.calendar.exec()

        // console.log(this.calendar.today())
        // console.log()

        console.log('init???'.cyan)
        // this.calendar.daysInMonth(MONTHS.FEB)
        const weekInfo = this.calendar.weekByDate('2024-12-30');
        // const weekInfo = this.calendar.weekByDate();

        const selectedGroup = this.selectedGroupForWeek(weekInfo.weekOfYear)

        console.log(weekInfo)
        console.log(selectedGroup)
    }

    selectedGroupForWeek(week: number) {
        const groupIndex = (week - 1) % this.onCallGroups.length;
        return this.onCallGroups[groupIndex];
    }
}