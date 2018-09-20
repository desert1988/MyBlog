var express = require("express");
var app = express();

//below is activation of "views" folder  with ".ejs" files inside, so from now you can rendering that files
app.set("view engine", "ejs"); 

app.get("/", function(req, res){
    // <=== randering a file views/landingpage.ejs
    res.render("landingpage");
    
});

app.get("/places", function(req, res){
    var places = [
        {name: "Shenzhen", image: "https://lh5.googleusercontent.com/proxy/0vzAA5YhTvDRKpRzCpqg6Z-8ADu5YPWBWmcnJ8BNzK6e1J4vEMX_YZyWBHaDgcHpcjxVC5kGVfyTZ6U1MB1yfca3LBiuCFrEJhmJM5XgGbpEknulX2-hCorIT65pouqYmepqolEJq7Xt3wfJeJMIWDe7AYw=w586-h360-k-no"},
        {name: "Hong Kong", image: "https://lh3.googleusercontent.com/proxy/CEnPeR0ju2MO9A-VVpoPVwetB6IA9-jFitb_UNoeD-m_sbbF-nKnVbVRqDo52ki-8SlxfUmS06XnXWfaG5I3AC4tniIARN_ABLmDj3Ytfbb_GeGne9f9OEDWT6ZF5yCb-__D2RHKt0OCkCgk9Tx3tvs4OoU=w542-h360-k-no"},
        {name: "Guangzhou", image: "https://lh4.googleusercontent.com/proxy/uB0ABh39ihVDm3aHn8idJH0guxhpN51VDqhlyZryOMRQ4ImzcHdpteYIE0AhvM0QsG5Kz1sz2O9Jk5YuKDnDo0fWbsuqCH4op_0Rbx002Py2bZXxZuosl0528IAN2WalTQlEojTi1CH3Rj43I6rV0_FbOUQ=w541-h360-k-no"}
    ];
    
    res.render("places", {places: places});
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App is running well!");
});



