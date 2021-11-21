const express = require("express")
const mainConfig = require("./config/mainConfig")

const start = async () => {
    const app = express()

    await mainConfig(app)
}

start()
