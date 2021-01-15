import { Container, Button } from "react-bootstrap";

import "./catalogpage.css";

const CatalogPage = () => {
  return <>
    <Container className="normal-container">
      <h1>Product Catalog</h1>
      <div className="separator"></div>
      <p>Click to View our Latest Catalog:</p>
      <a href="#"><h5>Penny Plate Catalog</h5></a>
    </Container>
  </>
}

export default CatalogPage;