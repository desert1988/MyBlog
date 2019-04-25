const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

//Model setup for Mongo
module.exports = mongoose.model("User", UserSchema);