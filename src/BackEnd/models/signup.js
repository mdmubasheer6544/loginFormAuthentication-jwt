const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  userProf: String,
});
const User = mongoose.model("userDetail", UserSchema);

module.exports = User;