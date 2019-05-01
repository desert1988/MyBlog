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
                   req.flash("error", "Something went wrong");
                   console.log(err);
               } else {
                   //add user to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   //save comment
                   comment.save();
                   foundPlace.comments.push(comment);
                   foundPlace.save();
                   req.flash("success", "Successfully added new comment!");
                   res.redirect("/places/" + foundPlace._id);
               }
           });
       }
    });
});

//add comments edit functionality
router.get("/:comment_id/edit", checkCommenter, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("./comments/edit", {place_id: req.params.id, comment: foundComment});
        }
    });
    
});

//update comments route
router.put("/:comment_id", checkCommenter, function(req, res){
   //*.findByIdAndUpdate(id defined by, updated it with, callback to run afterwards)
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Successfully edited comment!");
           res.redirect("/places/" + req.params.id );
       }
    }); 
}); 

//remove comments route
router.delete("/:comment_id", checkCommenter, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/places/" + req.params.id);
        }
    });
    
});

//middleware Login logic
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login!");
    res.redirect("/login");
}

//check is User/author who create Comment logged in
function checkCommenter(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, selectedComment) {
            if(err){
                res.redirect("back");
            } else {
                if(selectedComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please login!");
        res.redirect("back");
    }
}


module.exports = router;