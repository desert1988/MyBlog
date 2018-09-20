var express = require("express");
var app = express();


app.get("/", function(req, res){
    res.send("So let's start our trip!");
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App is running well!");
});