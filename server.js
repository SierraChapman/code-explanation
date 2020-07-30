// Import express for setting up the srver
var express = require("express");
// Import express-session for keeping track of login status
var session = require("express-session");
// Import configured passport
var passport = require("./config/passport");

// Get port from local environment variables (if deployed on a server) or set to 8080
var PORT = process.env.PORT || 8080;
// Import models
var db = require("./models");

// Create an instance of express server
var app = express();
// Use middleware to parse json in request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use middleware to serve contents of the public file
app.use(express.static("public"));
// Use express-session to keep track of user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// Tell the app to use passport
app.use(passport.initialize());
// Enable persistent login session
app.use(passport.session());

// Require our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Sync the database to the models
db.sequelize.sync().then(function() {
  // After syncing, start the server
  app.listen(PORT, function() {
    // After the server starts, console.log confirmation of  this
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
