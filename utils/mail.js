const config = require("./config")[process.env.NODE_ENV || "dev"];
const DOMAIN = config.mailgun_domain;
const mailgun = require("mailgun-js");
const mg = mailgun({
  apiKey: config.mailgun_api_key,
  domain: DOMAIN,
});

module.exports = {
  sendVerificationMail: function (email, firstname) {
    const data = {
      from: "Share Story <noreply@sharestory.ng>",
      to: email,
      subject: "Welcome to Share Story!",
      text: `Hello ${firstname},
      
            Welcome to Share Story where you have the opportunity to share your stories with individuals, friends and colleagues. We trust that you'd have a good time.
      
            Enjoy!!
      
            The Share Story Team`,
    };
    mg.messages().send(data, function (error, body) {
      console.log(body);
    });
  },
};
