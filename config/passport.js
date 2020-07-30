// Require dependencies
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// Import the models (actually just the User model)
var db = require("../models");

// Configuring passport to use a local strategy (sign in directly through our site) and other settings
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  // A function to implement when a user tries to sign in
  function(email, password, done) {
    // done is a callback function taking an error, the user data, and another object with more info
    
    // Find the user with the matching email
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email, do not return a user, and include a message explaining why
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If the email was found, use our validPassword method to check the password
      else if (!dbUser.validPassword(password)) {
        // If the password is not a match with the saved hash value, do not return a user, and include a message explaining why
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, the email and password were correct, so return the user data
      return done(null, dbUser);
    });
  }
));

// Serialize the user to maintain login status. This stores user data in a cookie on the browser
passport.serializeUser(function(user, cb) {
  // The entire user object is stored and sent as req.user in each request while the user is signed in
  cb(null, user);
});

// Deserialize the user to allow them to logout
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Export our configured passport
module.exports = passport;
