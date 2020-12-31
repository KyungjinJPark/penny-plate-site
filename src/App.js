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
        <h3>PennyPlate, LLC</h3>
        <p>
          4461 Cox Rd. Suite 108<br />
          Glen Allen, VA 23060
        </p>
      </Col>
      <Col xs={3}>
        <p>
          Telephone: 856-429-7583<br />
          Toll Free: 1-800-527-9909<br />
          Fax: 804-897-1926
        </p>
      </Col>
      <Col xs={6}>
        <p>
          Customer Service: 800-677-3102<br />
          Email: info@pennyplate.com
        </p>
      </Col>
    </Row>
  </div>
</footer>;

export default App;
