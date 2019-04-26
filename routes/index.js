const express = require("express"),
      router = express.Router(),
      passport = require("passport"),
      User = require("../models/user");
      

//root      
router.get("/", function(req, res){
    // <=== randering a file views/landingpage.ejs
    res.render("landingpage");
    
});

//Auth Routes
//1. Sign Up:
router.get("/signup", function(req, res) {
    res.render("signup");
});
router.post("/signup", function(req, res) {
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
router.get("/login", function(req, res){
    res.render("login");
});
router.post("/login", passport.authenticate("local", {
    successRedirect: "/places",
    failureRedirect: "/login"
}), function(req, res) {
});

//3. Logout:
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/places");
});

//4. Midleware Login logic:
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;