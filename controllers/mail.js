const sgMail = require("@sendgrid/mail");
const express = require("express");

module.exports = {
  sendEmail: async (request, response) => {
    const { email } = request.body;
    const apikey =
      "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";
    //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.setApiKey(apikey);
    try {
      const msg = {
        to: email,
        from: "no-reply@send.ng",
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      };
      sgMail.send(msg);
      return response.status(200).send("sent message");
    } catch (e) {
      console.log(e);
    }
  },
};
