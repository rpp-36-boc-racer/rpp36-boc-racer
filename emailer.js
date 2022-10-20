const nodemailer = require("nodemailer");
require("dotenv").config();

const emailAddress = process.env.EMAIL;
const emailPassord = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailAddress,
    pass: emailPassord,
  },
});

exports.sendEmail = (mailOptions) => {
  transporter.sendMail(
    { from: emailAddress, ...mailOptions },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    }
  );
};
