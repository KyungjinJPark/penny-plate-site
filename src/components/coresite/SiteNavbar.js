import { Navbar, Nav, Container } from "react-bootstrap";

import logoImg from "../../imgs/pennyplate-logo.png";

const SiteNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logoImg}
            height="50"
            className="d-inline-block align-top"
            alt="PennyPlate"
          />
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/catalog">Catalog</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default SiteNavbar;