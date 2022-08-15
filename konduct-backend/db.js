const mongoose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/Konduct?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = async() => {
    mongoose.connect(mongoUrl, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;