import {EmployeeEntity} from "@/domain/entities/employee.entity";

export class OnCallEntity {
    constructor(
        private employees: Array<EmployeeEntity>
    ) {
    }
}