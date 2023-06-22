const mongoose = require('mongoose');
module.exports = function databaseConnection() {
    return mongoose.connect(process.env.DATABASE_URL)
}
