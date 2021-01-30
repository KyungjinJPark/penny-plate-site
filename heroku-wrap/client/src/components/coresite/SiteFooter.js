import { Container, Row, Col } from "react-bootstrap";

const SiteFooter = () => <footer id="footer">
  <div id="footer-red-bar">
  </div>
  <Container>
    <div id="footer-content">
      <Row>
        <Col
          sm={12} md={4}
          className="footer-col"
        >
          <h3 className="footer-heading">Penny Plate, LLC</h3>
          <p className="footer-text">
            4461 Cox Rd. Suite 108<br />
            Glen Allen, VA 23060
          </p>
        </Col>
        <Col
          sm={12} md={4}
          className="footer-col"
        >
          <p className="footer-text">
            <b>Telephone</b>: 856-429-7583<br />
            <b>Toll Free</b>: 1-800-527-9909<br />
          </p>
        </Col>
        <Col
          sm={12} md={4}
          className="footer-col"
        >
          <p className="footer-text">
            <b>Customer Service</b>: 800-677-3102<br />
            <b>Email</b>: info@pennyplate.com
          </p>
        </Col>
      </Row>
    </div>
  </Container>
</footer>

export default SiteFooter;