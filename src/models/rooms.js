const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
    firstUser: {
        type: String,
        required: true
    },
    secondUser: {
        type: String,
        required: true
    }
});
const roomModel = mongoose.model("rooms", roomSchema);
module.exports = roomModel; 