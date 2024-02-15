import {OnCallEntity} from "@/domain/entities/on-call.entity";
import {Calendar} from "@/utils/calendar/calendar";
import {MONTHS} from "@/utils/calendar/enums";

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

interface ISchedule {
    group: number, // todo - converter para entidades para saber quem estava no grupo
    week: number, // todo - adicionar info dos dias e meses que representam essa semana
}

export class OnCallScheduler {
    private calendar: Calendar
    private schedules: Array<ISchedule> = []

    constructor(
        private onCallGroups: Array<OnCallEntity>
    ) {
        this.calendar = new Calendar()
    }

    init() {
        console.log(this.onCallGroups)
        console.log('\n')

        console.log('init???'.cyan)
        // this.calendar.daysInMonth(MONTHS.FEB)
        const weekInfo = this.calendar.weekByDate('2024-12-30');
        // const weekInfo = this.calendar.weekByDate();

        const selectedGroup = this.selectedGroupForWeek(weekInfo.weekOfYear)

        console.log(weekInfo)
        console.log(selectedGroup)

        this.calcWeeks()
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

            this.schedules.push({
                group: groupIdx,
                week: weekIdx,
            })

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

        console.log(this.schedules)
    }

    addGroup() {

    }

    selectedGroupForWeek(week: number) {
        const groupIndex = (week - 1) % this.onCallGroups.length;
        return this.onCallGroups[groupIndex];
    }
}


const _3 = [
  { g: 0, w: 1 },  { g: 1, w: 2 },  { g: 2, w: 3 },
  { g: 0, w: 4 },  { g: 1, w: 5 },  { g: 2, w: 6 },
  { g: 0, w: 7 },  { g: 1, w: 8 },  { g: 2, w: 9 },
  { g: 0, w: 10 }, { g: 1, w: 11 }, { g: 2, w: 12 },
  { g: 0, w: 13 }, { g: 1, w: 14 }, { g: 2, w: 15 },
  { g: 0, w: 16 }, { g: 1, w: 17 }, { g: 2, w: 18 },
  { g: 0, w: 19 }, { g: 1, w: 20 }, { g: 2, w: 21 },
  { g: 0, w: 22 }, { g: 1, w: 23 }, { g: 2, w: 24 },
  { g: 0, w: 25 }, { g: 1, w: 26 }, { g: 2, w: 27 },
  { g: 0, w: 28 }, { g: 1, w: 29 }, { g: 2, w: 30 },
  { g: 0, w: 31 }, { g: 1, w: 32 }, { g: 2, w: 33 },
  { g: 0, w: 34 }, { g: 1, w: 35 }, { g: 2, w: 36 },
  { g: 0, w: 37 }, { g: 1, w: 38 }, { g: 2, w: 39 },
  { g: 0, w: 40 }, { g: 1, w: 41 }, { g: 2, w: 42 },
  { g: 0, w: 43 }, { g: 1, w: 44 }, { g: 2, w: 45 },
  { g: 0, w: 46 }, { g: 1, w: 47 }, { g: 2, w: 48 },
  { g: 0, w: 49 }, { g: 1, w: 50 }, { g: 2, w: 51 },
  { g: 0, w: 52 }
]

const _4 = [
    { g: 0, w: 1 },  { g: 1, w: 2 },  { g: 2, w: 3 },
    { g: 3, w: 4 },  { g: 0, w: 5 },  { g: 1, w: 6 },
    { g: 2, w: 7 },  { g: 3, w: 8 },  { g: 0, w: 9 },
    { g: 1, w: 10 }, { g: 2, w: 11 }, { g: 3, w: 12 },
    { g: 0, w: 13 }, { g: 1, w: 14 }, { g: 2, w: 15 },
    { g: 3, w: 16 }, { g: 0, w: 17 }, { g: 1, w: 18 },
    { g: 2, w: 19 }, { g: 3, w: 20 }, { g: 0, w: 21 },
    { g: 1, w: 22 }, { g: 2, w: 23 }, { g: 3, w: 24 },
    { g: 0, w: 25 }, { g: 1, w: 26 }, { g: 2, w: 27 },
    { g: 3, w: 28 }, { g: 0, w: 29 }, { g: 1, w: 30 },
    { g: 2, w: 31 }, { g: 3, w: 32 }, { g: 0, w: 33 },
    { g: 1, w: 34 }, { g: 2, w: 35 }, { g: 3, w: 36 },
    { g: 0, w: 37 }, { g: 1, w: 38 }, { g: 2, w: 39 },
    { g: 3, w: 40 }, { g: 0, w: 41 }, { g: 1, w: 42 },
    { g: 2, w: 43 }, { g: 3, w: 44 }, { g: 0, w: 45 },
    { g: 1, w: 46 }, { g: 2, w: 47 }, { g: 3, w: 48 },
    { g: 0, w: 49 }, { g: 1, w: 50 }, { g: 2, w: 51 },
    { g: 3, w: 52 }
]

const _4_no_ok = [
    { g: 0, w: 1 },  { g: 1, w: 2 },  { g: 2, w: 3 },
    { g: 0, w: 4 },  { g: 1, w: 5 },  { g: 2, w: 6 },
    { g: 0, w: 7 },  { g: 1, w: 8 },  { g: 2, w: 9 },
    { g: 0, w: 10 }, { g: 1, w: 11 }, { g: 2, w: 12 },
    { g: 0, w: 13 }, { g: 1, w: 14 }, { g: 2, w: 15 },
    { g: 0, w: 16 }, { g: 1, w: 17 }, { g: 2, w: 18 },
    { g: 0, w: 19 }, { g: 1, w: 20 }, { g: 2, w: 21 },
    { g: 0, w: 22 }, { g: 1, w: 23 }, { g: 2, w: 24 },
    { g: 0, w: 25 }, { g: 1, w: 26 }, { g: 2, w: 27 },
    { g: 0, w: 28 }, { g: 1, w: 29 }, { g: 0, w: 1 }, //voltou para grupo 0, deveria ter ido para grupo 2
    { g: 1, w: 2 },  { g: 2, w: 3 },  { g: 3, w: 4 },
    { g: 0, w: 5 },  { g: 1, w: 6 },  { g: 2, w: 7 },
    { g: 3, w: 8 },  { g: 0, w: 9 },  { g: 1, w: 10 },
    { g: 2, w: 11 }, { g: 3, w: 12 }, { g: 0, w: 13 },
    { g: 1, w: 14 }, { g: 2, w: 15 }, { g: 3, w: 16 },
    { g: 0, w: 17 }, { g: 1, w: 18 }, { g: 2, w: 19 },
    { g: 3, w: 20 }, { g: 0, w: 21 }, { g: 1, w: 22 }
]

const _4_test = [
    { g: 0, w: 1 },  { g: 1, w: 2 },  { g: 2, w: 3 },
    { g: 0, w: 4 },  { g: 1, w: 5 },  { g: 2, w: 6 },
    { g: 0, w: 7 },  { g: 1, w: 8 },  { g: 2, w: 9 },
    { g: 0, w: 10 }, { g: 1, w: 11 }, { g: 2, w: 12 },
    { g: 0, w: 13 }, { g: 1, w: 14 }, { g: 2, w: 15 },
    { g: 0, w: 16 }, { g: 1, w: 17 }, { g: 2, w: 18 },
    { g: 0, w: 19 }, { g: 1, w: 20 }, { g: 2, w: 21 },
    { g: 0, w: 22 }, { g: 1, w: 23 }, { g: 2, w: 24 },
    { g: 0, w: 25 }, { g: 1, w: 26 }, { g: 2, w: 27 },
    { g: 0, w: 28 }, { g: 1, w: 29 }, { g: 1, w: 2 },
    { g: 2, w: 3 },  { g: 3, w: 4 },  { g: 0, w: 5 },
    { g: 1, w: 6 },  { g: 2, w: 7 },  { g: 3, w: 8 },
    { g: 0, w: 9 },  { g: 1, w: 10 }, { g: 2, w: 11 },
    { g: 3, w: 12 }, { g: 0, w: 13 }, { g: 1, w: 14 },
    { g: 2, w: 15 }, { g: 3, w: 16 }, { g: 0, w: 17 },
    { g: 1, w: 18 }, { g: 2, w: 19 }, { g: 3, w: 20 },
    { g: 0, w: 21 }, { g: 1, w: 22 }
]


