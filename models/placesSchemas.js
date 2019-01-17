const mongoose = require("mongoose");

//Schema setup for Mongo
let placeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//Model setup for Mongo
module.exports = mongoose.model("Place", placeSchema);
