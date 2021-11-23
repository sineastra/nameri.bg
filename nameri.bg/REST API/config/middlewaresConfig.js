const processAuth = require("../middlewares/processAuth")

// custom middlewares created by me for use in the app. descriptions in the Middleware files themselves.

const middlewaresConfig = app => {
    app.use(processAuth)
}

module.exports = middlewaresConfig
