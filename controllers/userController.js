const userModel = require("../models/userModel");
const bcrypt = require("bcrypt-nodejs");
const mail = require("../utils/mail");

module.exports = {
  register: async function (req, res) {
    try {
      const { email } = req.body;
      let user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User already exists. Please signup with a new email",
        });
      }
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, null, null, function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });
      req.body.password = hashedPassword;
      user = await userModel(req.body).save();
      await mail.sendVerificationMail(email, user.firstname);
      return res.status(200).json({ message: "Created a new user", user });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },
};
