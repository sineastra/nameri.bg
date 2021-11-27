const TownModel = require("../models/TownModel")

const townsServices = {
    getAll: async () => await TownModel.find({}).exec(),
}

module.exports = townsServices
