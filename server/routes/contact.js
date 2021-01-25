import express from "express";
import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();


// Nodemailer account set up and verification
console.log("Setting up Nodemailer.....");

let contactEmail = undefined;

try {
  contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USERNAME + "@gmail.com",
      pass: process.env.NODEMAILER_PASSWORD
    },
  });

  contactEmail.verify((error) => {
    if (error) {
      console.log("ERROR!");
      console.log("Err info: ", error);
    }
  });
  console.log("SUCCESS!");
} catch (error) {
  console.log("ERROR!");
  console.log("Err info: ", error);
}

// handler for post requests
router.post("/send-mail", (req, res) => {
  console.log("Recieved request to send email.");
  try {
    const { name, email, subject, message } = req.body;
    const mail = {
      from: name,
      to: "kjosiahpark@gmail.com",
      subject: `Contact Form: ${subject}`,
      html: `<p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>`,
    };
    console.log(mail)
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        console.log("Error with Nodemailer. Email not sent.");
        res.json({ status: "Error sending email! Please email info@pennyplate.com manually." });
      } else {
        console.log("Email sent.");
        res.json({ status: "Message successfully sent!" });
      }
    });
  } catch (error) {
    console.log("Error sending email");
    console.log("Err msg: ", error);
    res.json({ status: "Error sending email! Please email info@pennyplate.com manually." });
  }
});

export default router;