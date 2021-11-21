const dbConfig = require("./dbConfig.js")

// Main config file, which accepts the express() App and executes all the configuration files on it.
// In other words this function is just a wrapper for all the config files so the index.js file is clean of bloatware.
// It must be async because we have a DB connection operations in some config, which are *always* async and must be awaited.
module.exports = async app => {
    await dbConfig(app)
}
