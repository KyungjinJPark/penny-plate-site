import { Container, Row, Col } from "react-bootstrap";

import "./aboutpage.css";
import Timeline from "./Timeline";

const AboutPage = () => {
  const marketsData = [
    {
      header: "Food Processors",
      text: "Food industry giants buy various Penny Plate products to cook or bake prepared meals. Food Processors use Penny Plate containers to make anything from muffins, to casseroles, to lasagna.  Then the Food Processors either repackage the item for retail sale, or the cooked food remains in a Penny Plate pan and is sold in the frozen food section of the grocery store",
    },
    {
      header: "Food Service Distribution",
      text: "Food service distribution re-sells products to restaurants, bakeries, small grocers, and other distributors, giving smaller businesses access to Penny Plate products.  Distributors’ large volume Penny Plate orders are resold along with other company’s products on weekly routes to smaller businesses.",
    },
    {
      header: "Retail",
      text: "Grocery and warehouse stores buy Penny Plate products for either the prepared food section of their stores or to sell in small case packs for consumers. Penny Plate containers can be found anywhere from the in-store bakery to the bakeware aisle in major retail stores across the nation.",
    },
  ];

  return <Container className="normal-container">
    <h1>History</h1>
    <div className="separator"></div>
    <p>Founded in 1948, Penny Plate, LLC. has been committed to innovation, identifying opportunities to exceed customer expectations, and entering the market as the low cost provider. Today,  Penny Plate has one of the most extensive lines of aluminum containers, selling to Foodservice, Retail, and Packer Processor industries. Inventors of the widely used rolled rim technology, Penny Plate produces its own dyes and continues to be one of the leading innovators in aluminum container packaging.  We pride ourselves in the sustainability of our products, and our aluminum containers are 100% recyclable.</p>

    <div id="timeline-wrapper">
      <Timeline />
    </div>

    <h1>Markets</h1>
    <div className="separator"></div>
    <p>Penny Plate, LLC supplies three major markets: Food Processors, Food Service Distribution, and Retail. All three markets use our products in distinct ways:</p>
    <div className="markets-inside-wrapper">
      {marketsData.map((data, index) => <Row className="markets-li">
        <Col xs={1}>
          <div className="markets-red-circle">
            <p>{index + 1}</p>
          </div>
        </Col>
        <Col>
          <h4>{data.header}</h4>
          <p>{data.text}</p>
        </Col>
      </Row>)}
    </div>

    <h1>Aluminum {"&"} Food Service Resources</h1>
    <div className="separator"></div>
    <div className="resource-links">
      <a href="https://www.aluminum.org/">The Aluminum Association</a><br />
      <a href="http://www.afcma.org/">Aluminum Foil Container Manufacturers Association (AFCMA)</a><br />
      <a href="https://www.flexpackmag.com/events">Flexible Packaging and Equipment Show Dates</a><br />
      <a href="https://www.iddba.org/">International Dairy Deli Bakery Association</a><br />
      <a href="https://www.restaurant.org/home">National Restaurant Association</a><br />
      <a href="https://www.packagingdigest.com/">Packaging Digest</a><br />
      <a href="https://www.fpi.org/">Foodservice Packaging Institute</a><br />
    </div>
  </Container >
}

export default AboutPage;