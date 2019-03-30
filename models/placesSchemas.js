const mongoose = require("mongoose");

//Schema setup for Mongo
let placeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Comment"
        }
        
    ]
});

//Model setup for Mongo
module.exports = mongoose.model("Place", placeSchema);
