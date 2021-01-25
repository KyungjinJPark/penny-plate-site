import express, { response } from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("The '/contact' endpoint works");
})

export default router;

// // use express() to setup the server that’ll run on port 5000:
// const app = express();
// app.use("/", router);
// app.listen(5000, () => console.log("Server Running"));

// // import account credentials
// const credentials = require("../secret.js");

// // set up account w/ Nodemailer
// const contactEmail = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: credentials.NODEMAILER_USERNAME + "@gmail.com",
//     pass: credentials.NODEMAILER_PASSWORD
//   },
// });

// // verify account
// contactEmail.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready to Send");
//   }
// });

// // handler for post requests
// router.post("/contact/send-mail", (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const message = req.body.message;
//   const mail = {
//     from: name,
//     to: "kjosiahpark@gmail.com",
//     subject: "Contact Form Submission",
//     html: `<p>Name: ${name}</p>
//            <p>Email: ${email}</p>
//            <p>Message: ${message}</p>`,
//   };
//   contactEmail.sendMail(mail, (error) => {
//     if (error) {
//       res.json({ status: "ERROR" });
//     } else {
//       res.json({ status: "Message Sent" });
//     }
//   });
// });