var express = require("express");
var app = express();

//below is activation of "views" folder  with ".ejs" files inside, so from now you can rendering that files
app.set("view engine", "ejs"); 

app.get("/", function(req, res){
    // <=== randering a file views/landingpage.ejs
    res.render("landingpage");
    
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App is running well!");
});

