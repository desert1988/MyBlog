const mongoose = require("mongoose"),
      Place = require("./models/placesSchemas"),
      Comment = require("./models/comment");
      
      
 
let data = [
    {
        name: "Chernihiv", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/%D0%A7%D0%B5%D1%80%D0%BD%D0%B8%D0%B3%D0%BE%D0%B2._%D0%95%D0%BB%D0%B5%D1%86%D0%BA%D0%B8%D0%B9_%D0%BC%D0%BE%D0%BD%D0%B0%D1%81%D1%82%D1%8B%D1%80%D1%8C.jpg/800px-%D0%A7%D0%B5%D1%80%D0%BD%D0%B8%D0%B3%D0%BE%D0%B2._%D0%95%D0%BB%D0%B5%D1%86%D0%BA%D0%B8%D0%B9_%D0%BC%D0%BE%D0%BD%D0%B0%D1%81%D1%82%D1%8B%D1%80%D1%8C.jpg" ,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Bangkok", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Klongs.jpg/300px-Klongs.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Shenzhen", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Shenzhen_huizhanzhongxin.jpg/220px-Shenzhen_huizhanzhongxin.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function floatDB(){
   //Remove all campgrounds
   Place.remove({}, function(err){
       /* if(err){
            console.log(err);
        }
        console.log("removed all Places!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Place.create(seed, function(err, Place){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a Place");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is cool!!!",
                                author: "Desert"
                            }, function(err, Comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    Place.comments.push(Comment);
                                    Place.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });*/
    }); 
    //add a few comments
}
 
module.exports = floatDB;