import {
  BrowserRouter as Router,
  // NavLink
} from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';

import './App.css';
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

const NavBar = () => <Navbar bg="dark" variant="dark">
  <Navbar.Brand href="#home">PennyPlate</Navbar.Brand>
  <Nav className="mr-auto">
    <Nav.Link href='/'>Home</Nav.Link>
    <Nav.Link href='/products'>Products</Nav.Link>
    <Nav.Link href='/about'>About</Nav.Link>
    <Nav.Link href='/catalog'>Catalog</Nav.Link>
    <Nav.Link href='/new-items'>New Items</Nav.Link>
  </Nav>
  {/* <Button variant="outline-info">PDF (x)</Button> */}
</Navbar>;

const Footer = () => <footer className="footer">
  <p>© 2020 developer</p>
</footer>;

export default App;
