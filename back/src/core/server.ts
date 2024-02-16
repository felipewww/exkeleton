import express from "express";
import {bootstrap} from "@/core/bootstrap";
import {App} from "@/core/app";

export const app = App()
export const server = express()

bootstrap()
    .then(() => {
        server.listen(process.env.APP_PORT, () => {
            console.log(`Server init [port:${process.env.APP_PORT}]`.yellow.bold)
            console.log(`\nApplication running`.green.bold)
            console.log('\n')
        })
    })
    .catch((err) => {
        console.log("\nBootstrap error! Application doesn't started.".red.bold)
        console.log("\n")
        console.log(err)
    })
