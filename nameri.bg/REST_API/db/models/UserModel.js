const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    nameAndSurname: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    profileImg: { type: String, default: "" },
    listings: [{ type: String, ref: "Listing", default: [] }],
    reviews: [{ type: String, ref: "Review", default: [] }],
    rating: { type: Number, required: true },
    conversations: [{ type: String, ref: "Conversation", default: [] }],
    premiumPlan: { type: Number, required: true, default: 0 },
    about: { type: String },
    phone: { type: Number },
    address: { type: String },
    website: { type: String },
    skills: [{ type: String }],
    diplomasAndCertifs: [
        {
            heading: { type: String, required: true },
            institution: { type: String, required: true },
            from: { type: String, required: true },
            to: { type: String, required: true },
        },
    ],
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel
