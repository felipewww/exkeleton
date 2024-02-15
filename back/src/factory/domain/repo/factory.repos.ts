import {ScheduleRepo} from "@/domain/repos/schedule.repo";
import {ScheduleSourceFactory} from "@/factory/data/factory.source";

export function ScheduleRepoFactory() {
    return new ScheduleRepo(ScheduleSourceFactory())
}