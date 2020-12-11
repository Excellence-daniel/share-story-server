const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  firstname: String,
  createdon: { type: Date, default: moment().format() },
  email: String,
  password: String,
  lastname: String,
  phonenumber: String,
  emailverified: { type: Boolean, default: false },
});

module.exports = mongoose.model("users", UserModel);
