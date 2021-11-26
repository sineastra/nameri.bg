const userController = require("../controllers/userController.js")

// import all controllers for each routes

const routesConfig = app => {
    app.use("/api/user", userController)
    app.use("/", (req, res) => res.send("Service working. Make requests at /api."))
}

module.exports = routesConfig
