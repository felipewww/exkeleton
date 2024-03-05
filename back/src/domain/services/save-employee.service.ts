import {injectable, singleton} from "tsyringe";
import {Calendar} from "@/utils/calendar/calendar";

// @injectable()
@singleton()
export class SaveEmployeeService {
    constructor(
        private calendar: Calendar
    ) {
        console.log(this.calendar.today())
    }
}