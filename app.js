const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      flash = require("connect-flash"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      LocalPassport = require("passport-local"),
      mOverride = require("method-override"),
      User = require("./models/user"),
      Comment = require("./models/comment"),
      Place = require("./models/placesSchemas"),
      floatDB = require("./floatdb");

//dotenv setup
require('dotenv').config();
// Routes map     
const commentsRoutes = require("./routes/comments"),
      indexRoutes = require("./routes/index"),
      placesRoutes = require("./routes/places");

//connect withthing mongoose to guide DB(mongoDB)
//mongoose.connect("mongodb://localhost/guide");
mongoose.connect("mongodb+srv://desert:PASS_MONGO@cluster0-oul8i.mongodb.net/test?retryWrites=true");

//body parser conf read in man
app.use(bodyParser.urlencoded({extended: true}));

//below is activation of "views" folder  with ".ejs" files inside, so from now you can rendering that files
app.set("view engine", "ejs");


//add public dir to our app
app.use(express.static(__dirname + "/public"));

//read method-override doc or man
app.use(mOverride("_method"));

//activate connect-flash
app.use(flash());

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

//App detect Auth user - currentUser; and keys for connect-flash functionality
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
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

