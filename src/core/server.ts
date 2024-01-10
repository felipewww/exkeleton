import * as express from "express";

const app = express()

app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening on port ${process.env.APP_PORT}`)
})

export {
    app
}