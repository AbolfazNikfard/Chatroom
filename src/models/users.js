const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    Cname: {
        type: String,
        required: true
    },
    Cphone: {
        type: String,
        //unique: true,
        required: true,
        minlength: 11,
        maxlength: 11
    }
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        minlength: 11,
        maxlength: 11
    },
    Password:
    {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    contact: {
        type: [contactSchema]
    }
});
const usermodel = mongoose.model("users", userSchema);
module.exports = usermodel;