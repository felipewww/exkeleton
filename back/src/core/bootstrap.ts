import {AppContext} from "@/core/server";

export interface Bootstrapable {
    init(): Promise<void>
}

export async function bootstrap() {
    console.log('Bootstrap'.yellow.bold)

    for (let k of Object.keys(AppContext.bootstrap)) {
        console.log(`[bootstrap init] ${k}`.yellow.bold)
        // await AppContext.bootstrap[k].init()
    }
}