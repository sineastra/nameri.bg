const dbConfig = require("./dbConfig.js")
const expressConfig = require("./expressConfig")
const middlewaresConfig = require("./middlewaresConfig")
const routesConfig = require("./routesConfig")

// Main config file, which accepts the express() App and executes all the configuration files on it.
// In other words this function is just a wrapper for all the config files so the index.js file is clean of bloatware.
// It must be async because we have a DB connection operations in some config, which are *always* async and must be awaited.
const mainConfig = async app => {
    try {
        await dbConfig(app)

        expressConfig(app)
        middlewaresConfig(app)
        routesConfig(app)
    } catch (e) {
        console.log(e)
    }
}

module.exports = mainConfig
