// Run the code when the document has loaded
$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    // Display the email address received in the response
    $(".member-name").text(data.email);
  });
});
