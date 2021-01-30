import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-apollo";
import { Row, Col, Button, Modal, Carousel, Toast } from "react-bootstrap";

import { FOCUS_PRODUCT_INFO_QUERY } from "./queries";

const ProductPopUp = ({ show, item, addToSavedItems, onHide }) => {

  const [showToast, setShowToast] = useState(false);
  const { loading: infoLoading, error: infoError, data: infoData } = useQuery(FOCUS_PRODUCT_INFO_QUERY, {
    variables: { itemId: item.id },
  });

  if (infoLoading) {
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="xl"
        dialogClassName="no-border-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <h4>Fetching product info...</h4>
          <h4>If the products do not load, please retry or <Link to="/catalog">use the digital catalog</Link></h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  else if (infoError) {
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="xl"
        dialogClassName="no-border-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <h4>Could not fetch product info.</h4>
          <h4>Please retry or <Link to="/catalog">use the digital catalog</Link></h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  else {
    const info = infoData.products;
    return <>
      <Toast
        show={showToast}
        autohide
        delay={3000}
        onClose={() => { setShowToast(false) }}
        className="site-toast-style"
      >
        <Toast.Body>Item saved</Toast.Body>
      </Toast>
      <Modal
        show={show}
        onHide={onHide}
        size="xl"
        dialogClassName="no-border-modal"
        centered
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <div className="popup-content">
            <h1>{item.description}</h1>
            <p><em>{item.itemNo}</em></p>
            <Row>
              <Col lg={12} xl={6}>
                {(info.photos.length > 1)
                  ? <Carousel style={{ border: "1px solid #BBB" }}>
                    {info.photos.map((resource) => <Carousel.Item>
                      <img
                        src={resource.url}
                        className="product-popup-image"
                        alt="product"
                      />
                    </Carousel.Item>)}
                  </Carousel>
                  : <img
                    src={info.photos[0].url}
                    className="product-popup-image"
                    alt="product"
                  />}
              </Col>
              <Col lg={12} xl={6}>
                <p>
                  <b>Application(s):</b> {spaceManyWords(info.application)}<br />
                  <b>Product Type:</b> {spaceWords(info.productType)}<br />
                  <b>Shape:</b> {info.shape}<br />
                  <b>Stock Type:</b> {spaceWords("" + info.stockType)}<br />
                  <b>Rim:</b> {info.rimStyle}<br />
                  <b>Top In:</b> {info.topIn}<br />
                  <b>Top Out:</b> {info.topOut}<br />
                  <b>Bottom:</b> {info.bottom}<br />
                  <b>Depth:</b> {info.depth}<br />
                  <b>Capacity (Fl. Oz.):</b> {(info.panCapacity) ? info.panCapacity : "N/A"}<br />

                  <b>Pans per Case:</b> {info.pansPerCase}<br />
                  <b>TI:</b> {info.ti}<br />
                  <b>HI:</b> {info.hi}<br />
                  <b>Case Size (Ft. cubed):</b> {info.caseCubeFt}<br />
                  <b>Case Weight (lbs.):</b> {info.caseWeight}<br />
                  <b>Order Quantity:</b> {info.orderQuantity}<br />
                  <b>Pallet Weight (lbs.):</b> {info.palletWeight}<br />
                  <Button
                    variant="success"
                    onClick={() => { addToSavedItems(info); setShowToast(true) }}
                    style={{ marginTop: "10px" }}
                  >
                    Save Item
                      </Button>
                </p>
              </Col>
              {info.notices && <>
                <Col xs={12}>
                  <h1>Extra Information</h1>
                </Col>
                <Col xs={12}>
                  <div>
                    <p dangerouslySetInnerHTML={{ __html: info.notices.html }}></p>
                  </div>
                </Col>
              </>}
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => { addToSavedItems(info); setShowToast(true) }}>Save Item</Button>
          <Button variant="primary" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  }
}

const spaceManyWords = (names) => {
  let finalString = spaceWords("" + names[0]);
  for (let x = 1; x < names.length; ++x) {
    finalString = finalString + ", " + spaceWords("" + names[x]);
  }
  return finalString;
}

const spaceWords = (name) => {
  return name.replace(/([A-Z])/g, " $1");
}

export default ProductPopUp;