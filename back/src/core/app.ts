import "reflect-metadata";
import {onCallGroups, Pair} from "@/domain/bootstrap/pair";
import {OnCallSchedulerService} from "@/domain/services/on-call-scheduler.service";
import {OnCallSchedulerServiceFactory} from "@/core/di/domain/services/factory.services";
import {Bootstrapable} from "@/core/bootstrap";
import {Calendar} from "@/utils/calendar/calendar";

import {container} from "tsyringe";
import {SaveEmployeeService} from "@/domain/services/save-employee.service";

// const utilsContainer = container.createChildContainer();
const cal = container.resolve(Calendar)
console.log(cal)

const svc = container.resolve(SaveEmployeeService)
console.log(svc)

// console.log(utilsContainer)


export interface IBootstrapClasses {
    [key: string]: Bootstrapable
}

export interface AppContext {
    const: {
        // onCallGroups: Array<OnCallEntity>
    },
    services: {
        // onCallSchedulerService: OnCallSchedulerService
    },
    bootstrap: IBootstrapClasses,
    utils: {
        calendar: Calendar
    }
}

export function App(): AppContext {
    console.log('\nApp init...'.yellow.bold)

    return {
        const: {
            // onCallGroups
        },

        services: {
            // onCallSchedulerService: OnCallSchedulerServiceFactory(onCallGroups)
        },

        bootstrap: {
            pair: new Pair()
        },

        utils: {
            calendar: new Calendar()
        }
    }
}