const express = require("express")
const mainConfig = require("./config/mainConfig")
const app = express()

const start = async app => {
    // const port = process.env.expressPORT || "3030" - to uncomment when restarting pc, changed it.
    const port = "3030"

    await mainConfig(app)

    app.listen(port, () => console.log(`Listening on port ${port}`))
}

start(app)
