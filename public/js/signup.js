// Run the code when the document has loaded
$(document).ready(function() {
  // Get references to our form and input using jQuery
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // Handle the signup form being submitted
  signUpForm.on("submit", function(event) {
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
    // If email and password are both non-empty, run signUpUser
    signUpUser(userData.email, userData.password);
    // Clear the form inputs
    emailInput.val("");
    passwordInput.val("");
  });

  // Function for making the request to sign up a user
  function signUpUser(email, password) {
    // Do POST request for creating a new user, passing the email and password as the request body
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function(data) {
        // If the request was successful, redirect to the members page
        window.location.replace("/members");
      })
      .catch(handleLoginErr); // If there was an error, handle it with handleLoginErr
  }

  // Function for handling an error in signing up
  function handleLoginErr(err) {
    // Fill in the displayed error message with the error message received in the request
    $("#alert .msg").text(err.responseJSON);
    // Use jQuery's fadeIn method to make the error visible and animate the transition
    $("#alert").fadeIn(500);
  }
});
