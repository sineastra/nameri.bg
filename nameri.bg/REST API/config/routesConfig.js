const userController = require("../controllers/userController")

// import all controllers for each routes

const routesConfig = app => {
    app.use("/", (req, res) => res.send("Service working. Make requests at /api."))
    app.use("/api/user", userController)
}

module.exports = routesConfig
