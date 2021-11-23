const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    profilePic: { type: String },
    listings: [{ type: "ObjectId", ref: "Listing", default: [] }],
    reviews: [{ type: "ObjectId", ref: "Review", default: [] }],
})

const User = mongoose.model("User", UserSchema)
