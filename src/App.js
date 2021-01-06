import {
  BrowserRouter as Router,
  // NavLink
} from 'react-router-dom';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';

import './App.css';
import logoImg from './imgs/pennyplate-logo.png'
import Content from './Content';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Content />
      <Footer />
    </Router>
  );
}

const NavBar = () => <Navbar bg='primary' variant='dark'>
  <Navbar.Brand href='/'>
    <img
      src={logoImg}
      height='50'
      className='d-inline-block align-top'
      alt='PennyPlate'
    />
  </Navbar.Brand>
  <Nav>
    <Nav.Link href='/'>Home</Nav.Link>
    <Nav.Link href='/products'>Products</Nav.Link>
    <Nav.Link href='/about'>About</Nav.Link>
    <Nav.Link href='/catalog'>Catalog</Nav.Link>
    <Nav.Link href='/new-items'>New Items</Nav.Link>
  </Nav>
</Navbar>;

const Footer = () => <footer id='footer'>
  <div id='footer-red-bar'>
  </div>
  <div id='footer-content'>
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
          <b>Fax</b>: 804-897-1926
        </p>
      </Col>
      <Col xs={6}>
        <p className="footer-text">
          <b>Customer Service</b>: 800-677-3102<br />
          <b>bail</b>: info@pennyplate.com
        </p>
      </Col>
    </Row>
  </div>
</footer>;

export default App;
