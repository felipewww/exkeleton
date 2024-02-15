import {EmployeeEntity} from "@/domain/entities/employee.entity";
import {OnCallEntity} from "@/domain/entities/on-call.entity";
import { OnCallSchedulerServiceFactory } from "@/factory/domain/services/factory.services";

const employees: Array<EmployeeEntity> = [
    new EmployeeEntity('Felipe', 'felipe.barreiros@carrot.eco', 'felipewww'),
    new EmployeeEntity('João', 'jao@carrot.eco', 'jaowww'),
    new EmployeeEntity('Maria', 'maria@carrot.eco', 'mariawww'),
    new EmployeeEntity('José', 'ze@carrot.eco', 'zewww'),
]

const onCallGroups: Array<OnCallEntity> = [
    new OnCallEntity([
        employees[0],
        employees[1],
    ]),

    new OnCallEntity([
        employees[0],
        employees[3],
    ]),

    new OnCallEntity([
        employees[2],
        employees[3],
    ]),

    new OnCallEntity([
        employees[2],
        employees[3],
    ]),
]

export class Pair {
    constructor() {
    }

    init() {
        // const onCallScheduler = new OnCallSchedulerService(onCallGroups)
        const onCallScheduler = OnCallSchedulerServiceFactory(onCallGroups)

        onCallScheduler.init()
    }
}
