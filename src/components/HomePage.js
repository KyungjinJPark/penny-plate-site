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
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
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
      <Button variant="primary" style={{ position: "relative", zIndex: "2", marginTop: "-200px", left: "50%", msTransform: "translate(-50%, 0%)", transform: "translate(-50%, 0%)" }}>Browse our catalog</Button>
      <Container fluid>
        <Row>
          <Col>
            <h1>Over Half a Century of Innovation</h1>
            <p>Over the past half century, Penny Plate has established its position as an industry leader and the largest independently owned manufacturer of aluminum food containers for North America’s packer processor industry. We remain a family owned and operated business with a strong commitment to consistently provide the highest quality products and service to our valued customers.</p>
          </Col>
          <Col>
            <img
              src={sectionImg}
              height='525px'
              alt='Image of a Pan' />
          </Col>
        </Row>
      </Container>
    </div >
  )
}

export default HomePage