const mongoose              =  require("mongoose"),
    passport              =  require("passport"),
    bodyParser            =  require("body-parser"),
    LocalStrategy         =  require("passport-local"),
    passportLocalMongoose =  require("passport-local-mongoose"),
    User                  =  require("./models/user");

var express = require('express');
// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));


//Connecting database
mongoose.connect("mongodb://localhost/auth_demo");

app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,
    saveUninitialized:false
}));

passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded(
    { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());

//=======================
//      R O U T E S
//=======================

app.get("/", (req,res) =>{
    res.render("index");
})

app.get("/order", (req,res) =>{
    res.render("order");
})

app.get("/computers", (req,res) =>{
    res.render("computers");
})

app.get("/about_us", (req,res) =>{
    res.render("about_us");
})

app.get("/amd", (req,res) =>{
    res.render("amd");
})

app.get("/applemonitor", (req,res) =>{
    res.render("applemonitor");
})

app.get("/components", (req,res) =>{
    res.render("components");
})

app.get("/cyberpowerpc", (req,res) =>{
    res.render("cyberpowerpc");
})

app.get("/gygabyte", (req,res) =>{
    res.render("gygabyte");
})

app.get("/hyperx", (req,res) =>{
    res.render("hyperx");
})

app.get("/ibuypowerpc", (req,res) =>{
    res.render("ibuypowerpc");
})

app.get("/macpc", (req,res) =>{
    res.render("macpc");
})

app.get("/maingearpc", (req,res) =>{
    res.render("maingearpc");
})

app.get("/nvidia", (req,res) =>{
    res.render("nvidia");
})

app.get("/originpc", (req,res) =>{
    res.render("originpc");
})

app.get("/payment", (req,res) =>{
    res.render("payment");
})

app.get("/samsungmonitor", (req,res) =>{
    res.render("samsungmonitor");
})

app.get("/xydaxpc", (req,res) =>{
    res.render("xydaxpc");
})

app.get("/computers", (req,res) =>{
    res.render("computers");
})

app.get("/userprofile",isLoggedIn ,(req,res) =>{
    res.render("userprofile");
})
//Auth Routes
app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/userprofile",
    failureRedirect:"/login"
}),function (req, res){

});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{

    User.register(new User({username: req.body.username,phone:req.body.phone,telephone: req.body.telephone}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/login");
        })
    })
})

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


//Listen On Server


app.listen(process.env.PORT ||3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3000");
    }

});

app.use(express.static(__dirname + '/views'));


