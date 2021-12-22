const TownModel = require("../models/TownModel")

const townsServices = {
	getAll: async () => await TownModel.find({}).exec(),
	getAllNames: async () => await TownModel.find({}).select("name -_id").exec(),
	getById: async (_id) => await TownModel.findById(_id).exec(),
}

module.exports = townsServices
