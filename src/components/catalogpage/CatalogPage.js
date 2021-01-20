import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./catalogpage.css";

const CatalogPage = () => {
  return <>
    <Container className="normal-container">
      <h1>Product Catalog</h1>
      <div className="separator"></div>
      <p>Click to View our Latest Catalog:</p>
      <a href="#"><h4>Penny Plate Catalog</h4></a>
      <br />
      <h5>Our products can also be viewed on the website <Link to="/products">here</Link></h5>
    </Container>
  </>
}

export default CatalogPage;