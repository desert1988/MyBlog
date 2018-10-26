const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose");

//connect withthing mongoose to guide DB(mongoDB)
mongoose.connect("mongodb://localhost/guide");

app.use(bodyParser.urlencoded({extended: true}));

//below is activation of "views" folder  with ".ejs" files inside, so from now you can rendering that files
app.set("view engine", "ejs"); 

//Schema setup for Mongo
let placeSchema = new mongoose.Schema({
    name: String,
    image: String
});

//Model setup for Mongo
let Place = mongoose.model("Place", placeSchema);

//Manual place creation (test reasons only)
/*Place.create({
    name: "Shenzhen", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/View_east_along_Sungang_East_Road_from_Renmin_North_Road%2C_Shenzhen%2C_China.jpg/332px-View_east_along_Sungang_East_Road_from_Renmin_North_Road%2C_Shenzhen%2C_China.jpg"
    
}, function(err, place){
    if(err){
        console.log("Hah you pick up an ERROR =)");
        console.log(err);
    } else {
        console.log("Added new place!");
        console.log(place);
    } 
});*/



app.get("/", function(req, res){
    // <=== randering a file views/landingpage.ejs
    res.render("landingpage");
    
});

app.get("/places", function(req, res){
    // Get all Places from Mongo (guide DB)
    Place.find({}, function(err, allPlaces){
        if(err){
            console.log("You are catch an ERROR, lol;)");
            console.log(err);
        } else {
            res.render("places", {places: allPlaces});
        }
    });
   
   
    //old places Array on server
    // res.render("places", {places: places});
});


app.post("/places", function(req, res){
    // get data and add to places Array
    let name = req.body.name,
        image = req.body.image,
        newPlace = {name: name, image: image};
    //Create a new campground and save to guide DB
    Place.create(newPlace, function(err, placeCreated){
        if(err){
            console.log(err);
        } else {
            //redirect to places page
            res.redirect("/places");
        }
    });
});

app.get("/places/new", function(req, res) {
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App is running well!");
});



