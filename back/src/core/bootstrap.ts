import {app} from "@/core/server";

export interface Bootstrapable {
    init(): Promise<void>
}

export async function bootstrap() {
    console.log('Bootstrap'.yellow.bold)

    for (let k of Object.keys(app.bootstrap)) {
        console.log(`[bootstrap init] ${k}`.yellow.bold)
        await app.bootstrap[k].init()
    }
}