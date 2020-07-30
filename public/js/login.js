// Run the code when the document has loaded
$(document).ready(function() {
  // Get references to our form and input using jQuery
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // Handle the login form being submitted
  loginForm.on("submit", function(event) {
    // Prevent default form behavior
    event.preventDefault();
    // Extract the input values from the form and remove leading and trailing whitespace
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    // If either the email or the password are empty, return early and do nothing
    if (!userData.email || !userData.password) {
      return;
    }
    // If email and password are both non-empty, run loginUser
    loginUser(userData.email, userData.password);
    // Clear the form inputs
    emailInput.val("");
    passwordInput.val("");
  });

  // Function for making the request to log in a user
  function loginUser(email, password) {
    // Do POST request for loggin in a user, passing the email and password as the request body
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        // If the request was successful, redirect to the members page
        window.location.replace("/members");
      })
      .catch(function(err) {
        console.log(err); // If there was an error, show it in the console
      });
  }
});
