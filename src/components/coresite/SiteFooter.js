import { Container, Row, Col } from "react-bootstrap";

const SiteFooter = () => <footer id="footer">
  <div id="footer-red-bar">
  </div>
  <Container id="footer-content">
    <Row>
      <Col xs={3}>
        <h3 className="footer-heading">PennyPlate, LLC</h3>
        <p className="footer-text">
          4461 Cox Rd. Suite 108<br />
        Glen Allen, VA 23060
      </p>
      </Col>
      <Col xs={3}>
        <p className="footer-text">
          <b>Telephone</b>: 856-429-7583<br />
          <b>Toll Free</b>: 1-800-527-9909<br />
          {/* <b>Fax</b>: 804-897-1926 */}
        </p>
      </Col>
      <Col xs={6}>
        <p className="footer-text">
          <b>Customer Service</b>: 800-677-3102<br />
          <b>Mail</b>: info@pennyplate.com
      </p>
      </Col>
    </Row>
  </Container>
</footer>

export default SiteFooter;