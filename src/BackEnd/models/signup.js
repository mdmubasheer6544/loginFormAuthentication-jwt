const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  password: String,
  address:String,
});
const User = mongoose.model("userDetail", UserSchema);

module.exports = User;