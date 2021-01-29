var express        = require("express");
var app            = express();
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var bodyparser     = require("body-parser");
var passport       = require("passport");
var LocalStrategy  = require("passport-local");
var methodOverride = require("method-override");
var Vehicle        = require("./models/vehicle");
var Detail         = require("./models/detail");
var User           = require("./models/user");
var seedDB         = require("./seeds");

// Requiring Routes
var detailRoutes  = require("./routes/details");
var vehicleRoutes = require("./routes/vehicles");
var indexRoutes   = require("./routes/index");

console.log(process.env.DATABASEURL);
var url = process.env.DATABASEURL || "mongodb://localhost:27017/business"
mongoose.connect(url,
				 {
useUnifiedTopology: true,
	useCreateIndex: true,
useNewUrlParser: true});




app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB(); // seed the DB
	
// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});


app.use("/", indexRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/vehicles/:id/details", detailRoutes);

app.get("/details/:id", function(req, res){
    //find the campground with provided ID
    Detail.findById(req.params.id, function(err, foundDetail){
        if(err){
            console.log(err);
        } else {
            console.log(foundDetail)
            //render show template with that campground
            res.render("details/show", {detail: foundDetail});
        }
    });
});



var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Server Has Started...")
})