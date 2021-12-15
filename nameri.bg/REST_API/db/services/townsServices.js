const TownModel = require("../models/TownModel")

const townsServices = {
	getAll: async () => await TownModel.find({}).exec(),
	getAllNames: async () => await TownModel.find({}).select("name -_id").exec(),
	getByName: async (name) => await TownModel.findOne({ name: name }).exec(),
}

module.exports = townsServices
