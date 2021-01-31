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
        <p style={{ fontSize: "18px", color: "#555555", marginTop: "2em" }}>
          Ad blockers may block email requests. If this happens please disable the ad blocker or email info@pennyplate.com manually.
        </p>
      </div>
    </Container>
  )
}

export default ContactPage;


const ContactForm = () => {
  const [status, setStatus] = useState("Submit");

  const mailURL = "/api/contact/send-mail";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending... This may take a while");
    const { name, email, subject, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };
    await fetch(mailURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.status);
      })
      .catch(() => {
        alert("Browser error sending email! Please email info@pennyplate.com manually.");
      });
    setStatus("Submit");
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