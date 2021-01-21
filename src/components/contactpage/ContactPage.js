import { Container, Button } from "react-bootstrap";

import "./contactpage.css";

const ContactPage = () => {
  return <>
    <Container className="normal-container">
      <h1>Contact Us</h1>
      <div className="separator"></div>
      {/* <p>For questions, quote requests, or custom pan design requests, please complete the form below:</p> */}
      <p>For questions, quote requests, or custom pan design requests, please contact us at: <a href="mailto:info@pennyplate.com">info@pennyplate.com</a></p>
    </Container>
  </>
}

export default ContactPage;