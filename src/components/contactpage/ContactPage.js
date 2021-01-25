import { useState } from "react";
import { Container, Button } from "react-bootstrap";

import "./contactpage.css";

const ContactPage = () => {
  return (
    <Container className="normal-container">
      <h1>Contact Us</h1>
      <div className="separator"></div>
      <div className="content-section">
        <p>For questions, quote requests, or custom pan design requests, please complete the form below:</p>
        <ContactForm />
      </div>
    </Container>
  )
}

export default ContactPage;


const ContactForm = () => {
  const [status, setStatus] = useState("Submit");

  const mailURL = "https://pennyplate-email-test.herokuapp.com/contact/send-mail";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, subject, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };
    console.log("sending message")
    let response = await fetch(mailURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          required
          type="text"
          id="name"
          className="contact-page-input"
          placeholder="Your Name (Required)"
        />
      </div>
      <div>
        <input
          required
          type="email"
          id="email"
          className="contact-page-input"
          placeholder="Your Email (Required)"
        />
      </div>
      <div>
        <input
          required
          type="subject"
          id="subject"
          className="contact-page-input"
          placeholder="Subject"
        />
      </div>
      <div>
        <textarea
          required
          id="message"
          className="contact-page-input contact-page-input-tall"
          placeholder="Your Message"
        />
      </div>
      <Button type="submit">{status}</Button>
    </form>
  );
};