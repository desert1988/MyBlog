const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      LocalPassport = require("passport-local"),
      User = require("./models/user"),
      Comment = require("./models/comment"),
      Place = require("./models/placesSchemas"),
      floatDB = require("./floatdb");

//connect withthing mongoose to guide DB(mongoDB)
mongoose.connect("mongodb://localhost/guide");


app.use(bodyParser.urlencoded({extended: true}));

//below is activation of "views" folder  with ".ejs" files inside, so from now you can rendering that files
app.set("view engine", "ejs");

//add public dir to our app
app.use(express.static(__dirname + "/public"));

floatDB();

//Authentification Config (passportjs.com)
app.use(require("express-session")({
    secret: "Lapa and Me",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalPassport(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//app can find Auth user
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

/*//Schema setup for Mongo - goes to "models" folder, but keep place for history :)
let placeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//Model setup for Mongo
let Place = mongoose.model("Place",placeSchema);

//Manual place creation (test reasons only)
Place.create({
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

//Show all places
app.get("/places", function(req, res){
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
app.post("/places", function(req, res){
    // get data and add to places Array
    let name = req.body.name,
        image = req.body.image,
        description = req.body.description,
        newPlace = {name: name, image: image, description: description};
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
   res.render("places/new"); 
});

//SHOWs more information about picked Place
app.get("/places/:id", function(req, res){
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

//===============COMMENTS 

app.get("/places/:id/comments/new", isLoggedIn, function(req, res){
    Place.findById(req.params.id, function(err, foundPlace){
        if(err){
            console.log("You catch comment error:" + err);
        } else {
            res.render("comments/new", {place: foundPlace});
        }
    });
});

app.post("/places/:id/comments", isLoggedIn, function(req, res){
    Place.findById(req.params.id, function(err, foundPlace) {
       if(err){
           console.log("Post comment error:"+ err);
           res.redirect("/places");
       } else {
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   foundPlace.comments.push(comment);
                   foundPlace.save();
                   res.redirect("/places/" + foundPlace._id);
               }
           });
       }
    });
});
 
 
 
//Auth Routes
//1. Sign Up:
app.get("/signup", function(req, res) {
    res.render("signup");
});
app.post("/signup", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/places");
        });
    });
});

//2. Login:
app.get("/login", function(req, res){
    res.render("login");
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/places",
    failureRedirect: "/login"
}), function(req, res) {
});

//3. Logout:
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/places");
});

//4. Login logic:
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//=== Server up checker and PORT/IP setup
 
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App is running well!");
});








