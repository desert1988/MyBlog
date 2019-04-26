const mongoose = require("mongoose");

//Schema setup for Mongo
let placeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Comment"
        }
        
    ]
});

//Model setup for Mongo
module.exports = mongoose.model("Place", placeSchema);
