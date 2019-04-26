const express = require("express"),
      router = express.Router(),
      Place = require("../models/placesSchemas");

//Show all places
router.get("/", function(req, res){
    // Get all Places from Mongo (guide DB)
    Place.find({}, function(err, allPlaces){
        if(err){
            console.log("You are catch an ERROR, lol;)");
            console.log(err);
        } else {
            res.render("places/places", {places: allPlaces});
        }
    });
});

//Add new Place to DB
router.post("/", isLoggedIn, function(req, res){
    // get data and add to places Array
    let name = req.body.name,
        image = req.body.image,
        description = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        },
        newPlace = {name: name, image: image, description: description, author: author};
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

//Showing form to create new place
router.get("/new", isLoggedIn, function(req, res) {
   res.render("places/new"); 
});

//SHOWs more information about picked Place
router.get("/:id", function(req, res){
    //find Place within ID 
    Place.findById(req.params.id).populate("comments").exec(function(err, foundPlace){
        if(err){
            console.log("Catch an Error: " + err);
            res.redirect("/places");
        } else {
            //render show template with picked Place
            res.render("places/showInfo", {place: foundPlace});
        }
    });
});

//middleware Login logic
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;