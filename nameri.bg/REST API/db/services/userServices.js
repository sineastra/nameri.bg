const UserModel = require("../models/UserModel")

const userServices = {
    createNew: async userData => await new UserModel(userData).save(),
    getByEmail: async email => await UserModel.findOne({ email }).lean(),
}

module.exports = userServices
