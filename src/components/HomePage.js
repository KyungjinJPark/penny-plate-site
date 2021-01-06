import { Container, Row, Col, Carousel, Button } from 'react-bootstrap'

import carouselImg1 from "../imgs/turkey.jfif"
import carouselImg2 from "../imgs/lasagna.jfif"
import carouselImg3 from "../imgs/kabob.jfif"
import sectionImg from "../imgs/PennyPlateCookingSpree.jpg"

const HomePage = () => {
  return (
    <div>
      <Carousel style={{ position: "relative", zIndex: "1" }}>
        <Carousel.Item>
          <img
            src={carouselImg1}
            height='500px'
            style={{ objectFit: 'cover' }}
            className='d-block w-100'
            alt='Image of a turkey in a Pan'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={carouselImg2}
            height='500px'
            style={{ objectFit: 'cover' }}
            className='d-block w-100'
            alt='Image of lasagna in a Pan'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={carouselImg3}
            height='500px'
            style={{ objectFit: 'cover' }}
            className='d-block w-100'
            alt='Image of kabobs in a Pan'
          />
        </Carousel.Item>
      </Carousel>
      <Button
        className="homepage-button"
        variant="primary"
        href='/catalog'
      >
        Browse Our Catalog
      </Button>
      <Container>
        <Row>
          <Col>
            <h1>Over Half a Century of Innovation</h1>
            <div className="separator"></div>
            <p>Over the past half century, Penny Plate has established its position as an industry leader and the largest independently owned manufacturer of aluminum food containers for North America’s packer processor industry.
              <br /><br />
              We remain a family owned and operated business with a strong commitment to consistently provide the highest quality products and service to our valued customers.</p>
          </Col>
          <Col>
            <img
              src={sectionImg}
              height='525px'
              alt='Image of a Pan' />
            <Button
              className="homepage-button"
              variant="primary"
              href='/new-items'
            >
              Browse New Arrivals
            </Button>
          </Col>
        </Row>
      </Container>
    </div >
  )
}

export default HomePage