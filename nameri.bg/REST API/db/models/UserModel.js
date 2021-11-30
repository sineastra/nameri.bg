const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    nameAndSurname: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    profileImg: { type: String },
    listings: [{ type: "ObjectId", ref: "Listing", default: [] }],
    reviews: [{ type: "ObjectId", ref: "Review", default: [] }],
    conversations: [{ type: "ObjectId", ref: "Conversation", default: [] }],
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel
