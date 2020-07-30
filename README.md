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

This folder contains files defining the settings for passport authentication ([passport.js](#passport.js)) and the connection to the database ([config.json](#config.json)) as well as custom middleware ([isAuthenticated.js](#middleware/isAuthenticated.js)).

### config.json

The `config.json` file provides information for establishing the connection to the database, which is used in [models/index.js](#index.js). It is usually generated via the sequelize-cli with the command `sequelize init:config` and then edited to accurately reflect the username, password, and database name for the instance of MySQL that will be accessed.

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

The `public` folder contains files that are sent to the client as static content.

### signup.html

This HTML file generates the signup page, which includes a form containing the inputs for the new user's email address and password and a "sign up" button. There is also a link to the login page. The HTML file also links to the Bootstrap library (for styling), the custom stylesheet, and the client-side JavaScript.

### login.html

This HTML file generates the login page containing a form for the email and password of the user and a link to the signup page.

### members.html

This HTML file generates a welcome page for logged in users. It greets the user, addressing them by their email address, which is filled in by the client-size JavaScript in [members.js](#members.js). There is also a logout button.

### stylesheets/style.css

Most of the styling on this website is done through Bootstrap, but a little bit of custom styling is applied using `style.css` to get the login and signup forms to have sufficient spacing above them.

### js

client-side javascript

#### login.js

client-side logic for the login page

#### members.js

client-side logic for the members page

#### signup.js

client-side logic for the signup page