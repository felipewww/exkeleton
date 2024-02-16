import {onCallGroups, Pair} from "@/domain/bootstrap/pair";
import {OnCallSchedulerService} from "@/domain/services/on-call-scheduler.service";
import {OnCallSchedulerServiceFactory} from "@/factory/domain/services/factory.services";
import {OnCallEntity} from "@/domain/entities/on-call.entity";
import {Bootstrapable} from "@/core/bootstrap";

export interface IBootstrapClasses {
    [key: string]: Bootstrapable
}

export interface AppContext {
    const: {
        // onCallGroups: Array<OnCallEntity>
    },
    services: {
        onCallSchedulerService: OnCallSchedulerService
    },
    bootstrap: IBootstrapClasses
}

export function App(): AppContext {
    console.log('\nApp init...'.yellow.bold)

    return {
        const: {
            // onCallGroups
        },
        services: {
            onCallSchedulerService: OnCallSchedulerServiceFactory(onCallGroups)
        },
        bootstrap: {
            pair: new Pair()
        }
    }
}