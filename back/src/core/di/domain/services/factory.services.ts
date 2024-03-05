import {OnCallEntity} from "@/domain/entities/on-call.entity";
import {ScheduleRepoFactory} from "@/core/di/domain/repo/factory.repos";
import { OnCallSchedulerService } from "@/domain/services/on-call-scheduler.service";
import {AppContext} from "@/core/server";

export function OnCallSchedulerServiceFactory(

    onCallGroups: Array<OnCallEntity>
) {
    // return new OnCallSchedulerService(
    //     onCallGroups,
    //     ScheduleRepoFactory(),
    //     AppContext.utils.calendar
    // )
}
