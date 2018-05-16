const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



var app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


// Connect to database
// mongoose.connect("mongodb://localhost/yelp_camp");


// Routes

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", function(req, res) {
  res.render("secret");
});

// Connect to server
app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("Listening to server");
});
