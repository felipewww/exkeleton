import {OnCallEntity} from "@/domain/entities/on-call.entity";
import {Calendar} from "@/utils/calendar/calendar";
import {ScheduleRepoFactory} from "@/factory/domain/repo/factory.repos";
import { OnCallSchedulerService } from "@/domain/services/on-call-scheduler.service";

export function OnCallSchedulerServiceFactory(
    onCallGroups: Array<OnCallEntity>
) {
    return new OnCallSchedulerService(
        onCallGroups,
        ScheduleRepoFactory(),
        new Calendar()
    )
}
