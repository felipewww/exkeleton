// import * as express from "express";
import express from "express";
import {bootstrap} from "@/core/bootstrap";
import {App} from "@/core/app";

export const app = App()
export const server = express()

server.listen(process.env.APP_PORT, () => {
    console.log(`Server init [port:${process.env.APP_PORT}]`.yellow.bold)
    bootstrap()
    console.log(`\nApplication running`.green.bold)
    console.log('\n')

    app.context.pair.init()
})
