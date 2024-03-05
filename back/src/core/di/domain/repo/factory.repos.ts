import {ScheduleRepo} from "@/domain/repos/schedule.repo";
import {ScheduleSourceFactory} from "@/core/di/data/factory.source";

export function ScheduleRepoFactory() {
    return new ScheduleRepo(ScheduleSourceFactory())
}