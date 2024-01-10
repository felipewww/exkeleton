import 'module-alias/register'
import 'dotenv/config'
import * as express from 'express'
import {exportTestModuleAlias} from "@/core/server";
// import {exportTestModuleAlias} from "@/core/server";
// import {exportTestModuleAlias} from "@/core/server";
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.APP_PORT, () => {
    console.log(process.env.APP_ENV)
    console.log(exportTestModuleAlias)
    console.log(`Example app listening on port ${process.env.APP_PORT}`)
})