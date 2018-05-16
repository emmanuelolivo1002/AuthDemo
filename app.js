const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

const User = require('./models/user');

var app = express();



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')({
  secret: "This is a secret",
  resave: false,
  saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Connect to database
mongoose.connect("mongodb://localhost/auth_demo_app");


// ROUTES

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", function(req, res) {
  res.render("secret");
});

// Auth routes

// REGISTER ROUTES
// Show register form
app.get("/register", function(req, res) {
  res.render("register");
});

// Handle user signup
app.post("/register", function(req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secret");
      });
    }
  });
});

// LOGIN ROUTES
// Show login form
app.get("/login", function(req, res) {
  res.render("login");
});

//Handle user login
//middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }), function(req, res) {
});

// Connect to server
app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("Listening to server");
});
