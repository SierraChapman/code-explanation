// Require path for joining relative paths to __dirname
var path = require("path");

// Require our custom middleware that redirects not logged in users to the signin page
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes are exported for use in server.js
module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user logged in, redirect to the members page
    console.log(req.user);
    if (req.user) {
      res.redirect("/members");
    }
    // If not logged in, send signup page
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user logged in, redirect to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // If not logged in, send login page
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Add the isAuthenticated function as middleware
  // isAuthenticated redirects anyone who tries to access /members and is not logged in to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
