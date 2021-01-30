import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import logoImg from "../../imgs/pennyplate-logo.png";

const SiteNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link-style" to="/">
            <img
              src={logoImg}
              height="50"
              className="d-inline-block align-top"
              alt="Penny Plate Logo"
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="expang-navbar-button" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link><Link className="nav-link-style" to="/">Home</Link></Nav.Link>
            <Nav.Link><Link className="nav-link-style" to="/products">Products</Link></Nav.Link>
            <Nav.Link><Link className="nav-link-style" to="/about">About</Link></Nav.Link>
            <Nav.Link><Link className="nav-link-style" to="/catalog">Catalog</Link></Nav.Link>
            <Nav.Link><Link className="nav-link-style" to="/contact">Contact</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}

export default SiteNavbar;