const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema({
    messages: [
        {
            sender: { type: "String", ref: "User", required: true },
            text: { type: String },
            timeIssued: { type: String, default: Date.now },
        },
    ],
    participants: [{ type: "String", ref: "User", required: true }],
    user: { type: "String", ref: "User", required: true },
    timeCreated: { type: Date, default: Date.now },
})

const ConversationModel = mongoose.model("Conversation", ConversationSchema)

module.exports = ConversationModel
