// Require bcrypt for password hashing
var bcrypt = require("bcryptjs");
// Create the User model
module.exports = function(sequelize, DataTypes) {
  // Define the columns of the Users table
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING, // Email is of the string datatype
      allowNull: false, // Email cannot be null
      unique: true, // Each email address can only be associated with one user account
      validate: {
        isEmail: true // Must have proper email format
      }
    },
    password: {
      type: DataTypes.STRING, // The password is a string
      allowNull: false // It cannot be null
    }
  });
  // This method is used to check if the password entered matches the stored (hashed) password
  User.prototype.validPassword = function(password) {
    // compareSync compares an unhashed string and a hash value
    return bcrypt.compareSync(password, this.password);
  };
  // Add an automatic step to use bcrypt to hash the password before saving it in the database
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
