const ConversationModel = require("../models/ConversationModel")
const UserModel = require("../models/UserModel")
const { query } = require("express-validator")
const ReviewModel = require("../models/ReviewModel.js")

const userServices = {
	createNew: async userData => await new UserModel(userData).save(),
	getByEmail: async email => await UserModel.findOne({ email }).lean(),
	getAllUserMessages: async userId =>
		await UserModel.findById(userId)
			.populate({
				path: "conversations",
				populate: "user participants",
			})
			.select("conversations")
			.select("-_id")
			.exec(),
	getSingleMessage: async messageId =>
		await ConversationModel.findById(messageId).exec(),
	getUserForProfile: async userId =>
		await UserModel.findById(userId)
			.populate({
				path: "listings",
				populate: {
					path: "town",
				},
			})
			.exec(),
	getById: async (_id) => await UserModel.findById(_id).exec(),
	getByIdPopulateReviews: async (_id) => await UserModel.findById(_id).populate("reviews").exec(),
	updateById: async (_id, newUserData) => await UserModel.findByIdAndUpdate(_id, newUserData),
	searchUsers: async (criteria) => await UserModel.find({}).or([
		{ email: { $regex: criteria, $options: 'i' } },
		{ nameAndSurname: { $regex: criteria, $options: 'i' } },
	]).exec(),

	//TODO: create new controllers for conversations and reviews.
	checkExistingConversation: async (ids) => {
		const queryArr = ids.map(x => ({ participants: x }))

		return await ConversationModel.findOne({ $and: queryArr }).exec()
	},
	createNewConversation: async (data) => await new ConversationModel(data).save(),
	createNewReview: async (data) => await new ReviewModel(data).save(),
	getUserWithReviews: async (id) => await UserModel.findById(id).populate("reviews").exec()
}

module.exports = userServices
