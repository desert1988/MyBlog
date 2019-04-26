const express = require("express"),
      router = express.Router({mergeParams: true}), //{mergeParams: true} - fixing bug "FindById" and comments works! 
      Place = require("../models/placesSchemas"),
      Comment = require("../models/comment");

//New comment

router.get("/new", isLoggedIn, function(req, res){
    Place.findById(req.params.id, function(err, foundPlace){
        if(err){
            console.log("You catch comment error:" + err);
        } else {
            res.render("comments/new", {place: foundPlace});
        }
    });
});

//Create comment
router.post("/", isLoggedIn, function(req, res){
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

//middleware Login logic
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;