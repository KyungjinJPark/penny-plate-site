import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import logoImg from "../../imgs/pennyplate-logo.png";

const SiteNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link-style" to="/">
            <img
              src={logoImg}
              height="50"
              className="d-inline-block align-top"
              alt="Penny Plate"
            />
          </Link>
        </Navbar.Brand>
        <Nav>
          <Nav.Link><Link className="nav-link-style" to="/">Home</Link></Nav.Link>
          <Nav.Link><Link className="nav-link-style" to="/products">Products</Link></Nav.Link>
          <Nav.Link><Link className="nav-link-style" to="/about">About</Link></Nav.Link>
          <Nav.Link><Link className="nav-link-style" to="/catalog">Catalog</Link></Nav.Link>
          <Nav.Link><Link className="nav-link-style" to="/contact">Contact</Link></Nav.Link>
        </Nav>
      </Container>
    </Navbar >
  )
}

export default SiteNavbar;