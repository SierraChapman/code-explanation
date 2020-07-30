# Code Explanation
This is a walkthrough I wrote to explain a pre-existing application that checks it a user is signed in using passport. If they are signed in, they are shown a page with their email address and a functioning "log out" button, and if they are not signed in, they can log in or sign up. In addition to writing this README, I edited and added comments in the files themselves. The code was provided by Trilogy Education Services, a 2U, Inc.

## server.js
The `server.js` file sets up and starts the server. Some of it's important function are:

* Loading the passport configuration defined in [config/passport.js](#passport.js).
* Importing all the sequelize models defined in [models](#models) and saves them as `db`.
* Adding middleware to the server that:
    * Parses JSON sent in requests.
    * Serves the contents of the public file.
    * Keeps track of the user's login status using express-session.
    * Uses the passport authentication defined in [config/passport.js](#passport.js).
* Syncing the database with the sequelize models.
* Starting the server.

## routes
contains files with stored routes

### html-routes.js
defines html routes

### api-routes
defines api routes

## models
models files

### index.js
imports all moels

### user.js
defines user model

## config
configuration files

### config.json
info about accessing the database

### passport.js
defines authentication behavior

### middleware/isAuthenticated.js
checks if the user is authenticated and proceeds accordingly

## public
files to serve to the client

### js
client-side javascript

#### login.js
client-side logic for the login page

#### members.js
client-side logic for the members page

#### signup.js
client-side logic for the signup page

### stylesheets/style.css
styles to be applied to html

### login.html
login page

### members.html
members page

### signup.html
signup page