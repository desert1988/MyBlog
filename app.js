const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      LocalPassport = require("passport-local"),
      mOverride = require("method-override"),
      User = require("./models/user"),
      Comment = require("./models/comment"),
      Place = require("./models/placesSchemas"),
      floatDB = require("./floatdb");

// Routes map     
const commentsRoutes = require("./routes/comments"),
      indexRoutes = require("./routes/index"),
      placesRoutes = require("./routes/places");
      
//connect withthing mongoose to guide DB(mongoDB)
mongoose.connect("mongodb://localhost/guide");

//body parser conf read in man
app.use(bodyParser.urlencoded({extended: true}));

//below is activation of "views" folder  with ".ejs" files inside, so from now you can rendering that files
app.set("view engine", "ejs");

//add public dir to our app
app.use(express.static(__dirname + "/public"));

//read method-override doc or man
app.use(mOverride("_method"));

//tempDB for test reasons and clean all DB data
// floatDB();

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

//App detect Auth user - currentUser
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Routes config ("adress", link to file with conf)
app.use("/places/:id/comments", commentsRoutes);
app.use("/", indexRoutes);
app.use("/places", placesRoutes);

//=== Server up checker and PORT/IP setup
 
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App is running well!");
});

