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

## models

This directory contains the files for defining the sequelize models.

### index.js

The `index.js` file was likely generating using the sequelize-cli with the command `sequelize init:models`. This file establishes a connection to the database described in [config/config.json](#config.json) and imports all the models in the `models` folder, saving each model as well as the sequelize connection and the sequelize library in the `db` object.

### user.js

defines user model

## config

configuration files

### config.json

info about accessing the database

### passport.js

defines authentication behavior

### middleware/isAuthenticated.js

This file exports a custom middleware function that checks the user's login status. If the user is logged in, the server proceeds with the request. Otherwise, the user is redirected to the signup page. This function is used in [html-routes.js](#html-routes.js) to prevent users that are not logged in from viewing the `/members` page.

## routes

The `routes` directory defines the HTML and API routes that the server listens for.

### html-routes.js

This file defines the following HTML routes:

* GET request to `"/"`: redirects to "/members" if the user is logged in; otherwise, responds with the signup page for adding a user.
* GET request to `"/login"`: redirects to "/members" if the user is logged in; otherwise, responds with the login page for signing in an existing user.
* GET request to `"/members"`: uses the [isAuthenticated](#middleware/isAuthenticated.js) custom middleware function to redirect users who are not logged in to the signup page, then sends the html page for viewing the current user's email for logged in users.

### api-routes

This file defines the following API routes:

* POST request to `"/api/login"`: uses passport to authenticate and then log in the user.
* POST request to `"/api/signup"`: adds the new email and password to the User table in the database. If this was successful, the user is redirected to make a login API request. If adding the user failed (e.g. because the email is already used), an error status code and the error JSON object are sent back.
* GET request to `"/logout"`: logs out the user and redirects them to the signup page.
* GET request to `"/api/user_data"`: responds with the current user's email and id if they are logged in; otherwise, responds with an empty object.

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