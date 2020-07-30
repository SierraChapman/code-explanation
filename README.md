# Code Explanation
This is a walkthrough of a pre-existing application that allows user's to sign up or log in and uses passport to determine if they are logged in.

## server.js
The `server.js` file sets up and starts the server. Some of it's important function are:

* Loading the passport configuration defined in `config/passport.js`.
* Importing all the sequelize models defined in `models` and saves them as `db`.
* Adding middleware to the server that:
    * Parses JSON sent in requests.
    * Serves the contents of the public file.
    * Keeps track of the user's login status using express-session.
    * Uses the passport authentication defined in `config/passport.js`.
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