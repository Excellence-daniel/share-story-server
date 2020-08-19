const sgMail = require("@sendgrid/mail");
const express = require("express");

module.exports = {
  sendEmail: async (request, response) => {
    const { email, name = "", activationlink = "" } = request.body;
    console.log({ email });
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // sgMail.setApiKey(apikey);
    try {
      const msg = {
        to: email,
        from: "no-reply@send.ng",
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
        // html:
        //   "Hello" +
        //   (name ? " " + name : "") +
        //   ". Welcome to SEND and thank you for registering with us, we are happy to have you on board. Over the next few hours, someone from our team will get in touch in a few hours to confirm your account details and further understand your needs. After this, you will be able to sign in to proceed with your shipments. To speed up the process, you may verify your email address with this link: " +
        //   activationlink +
        //   ". All future notifications will be sent to this email address. Best Regards! Your SEND Team. www.send.ng", // plaintext body
        // html: `Hello ${name ? name : ""}
        //   <br><br>Welcome to SEND and thank you for registering with us, we are happy to have you on board.<br><br>Over the next few hours, someone from our team will get in touch to confirm your account details and further understand your needs. After this, you will be able to sign in to proceed with your shipments. <br><br>To speed up the process, you may verify your email address with this link:<br><br><a href="${activationlink}">Click Here</a><br><br>All future notifications will be sent to this email address.<br><br>Best Regards!<br><br>Your SEND Team<br><a href="https://www.send.ng">www.send.ng</a>`,
      };
      sgMail.send(msg);
      return response.status(200).send("sent message");
    } catch (e) {
      console.log(e);
    }
  },
};
