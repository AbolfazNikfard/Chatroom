const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
    roomFk: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userFk: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
const messageModel = mongoose.model("messages", messageSchema);
module.exports = messageModel;