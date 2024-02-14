import {Pair} from "@/domain/pair";

export function App() {
    console.log('\nApp init...'.yellow.bold)

    return {
        context: {
            pair: new Pair()
        }
    }
}