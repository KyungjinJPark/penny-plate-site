import { Link } from "react-router-dom";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";

import "./homepage.css";
import carouselImg1 from "../../imgs/turkey.jfif";
import carouselImg2 from "../../imgs/lasagna.jfif";
import carouselImg3 from "../../imgs/kabob.jfif";
import sectionImg from "../../imgs/PennyPlateCookingSpree.jpg";
import { NewItemList } from "../newitemspage/NewItemsPage"

const HomePage = () => {
  const carouselImgData = [
    {
      src: carouselImg1,
      alt: "Turkey in a Pan",
    },
    {
      src: carouselImg2,
      alt: "Lasagna in a Pan",
    },
    {
      src: carouselImg3,
      alt: "Kabobs in a Pan",
    },
  ];

  return <>
    <Carousel>
      {carouselImgData.map((imgData, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              src={imgData.src}
              className="d-block w-100 homepage-carousel-img"
              alt={imgData.alt}
            />
          </Carousel.Item>
        )
      })}
    </Carousel>
    <Button
      className="homepage-button button-pos-1"
      variant="primary"
      href="/catalog"
    >
      Browse Our Catalog
      </Button>
    <Container className="normal-container">
      <Row className="content-section">
        <Col xs={12} md={5}>
          <h1>Over Half a Century of Innovation</h1>
          <div className="separator"></div>
          <p>Over the past half century, Penny Plate has established its position as an industry leader and the largest independently owned manufacturer of aluminum food containers for North America’s packer processor industry.
              <br /><br />
              We remain a family owned and operated business with a strong commitment to consistently provide the highest quality products and service to our valued customers.</p>
        </Col>
        <Col xs={12} md={7}>
          <img
            src={sectionImg}
            width="100%"
            alt="Pan" />
          <Button
            className="homepage-button button-pos-2"
            variant="primary"
            href="/new-items"
          >
            Browse New Arrivals
            </Button>
        </Col>
      </Row>
      <div className="content-section">
        <Link to="/new-items" className="homepage-new-items-link"><h1>New Items</h1></Link>
        <div className="separator"></div>
        <NewItemList />
      </div>
    </Container>
  </>
}

export default HomePage;