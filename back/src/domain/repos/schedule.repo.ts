import {ScheduleSource} from "@/data/schedule.source";
import {ScheduleEntity} from "@/domain/entities/schedule.entity";

export class ScheduleRepo {
    constructor(
        private source: ScheduleSource
    ) {
    }

    all(): Array<ScheduleEntity> {
        return this.source.all();
    }
}
