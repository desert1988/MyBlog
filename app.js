var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

//below is activation of "views" folder  with ".ejs" files inside, so from now you can rendering that files
app.set("view engine", "ejs"); 

var places = [
        {name: "Shenzhen", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/View_east_along_Sungang_East_Road_from_Renmin_North_Road%2C_Shenzhen%2C_China.jpg/332px-View_east_along_Sungang_East_Road_from_Renmin_North_Road%2C_Shenzhen%2C_China.jpg"},
        {name: "Hong Kong", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Hong_kong_bruce_lee_statue.jpg/220px-Hong_kong_bruce_lee_statue.jpg"},
        {name: "Guangzhou", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Guangzhou_skyline.jpg/261px-Guangzhou_skyline.jpg"}
    ];

app.get("/", function(req, res){
    // <=== randering a file views/landingpage.ejs
    res.render("landingpage");
    
});

app.get("/places", function(req, res){
    //places Array
    
    
    res.render("places", {places: places});
});


app.post("/places", function(req, res){
    // get data and add to places Array
    var name = req.body.name;
    var image = req.body.image;
    var newPlace = {name: name, image: image};
    places.push(newPlace);
    // redirect to places page
    res.redirect("/places");
});

app.get("/places/new", function(req, res) {
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App is running well!");
});



