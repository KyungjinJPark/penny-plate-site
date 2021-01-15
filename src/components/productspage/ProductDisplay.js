import { useState } from "react";
import { useQuery } from "react-apollo";
import { Button, Card, Row, Col, InputGroup, FormControl, Modal } from "react-bootstrap";

import { PRODUCTS_QUERY, FOCUS_PRODUCT_INFO_QUERY } from "./queries";
import PdfBuilderOverlay from "./PdfBuilderOverlay";

const ProductsList = ({ toggleFilters, currentFilter, currentPType, currentShape, currentStock, currentSearch, changeSearch }) => {
  const [builderItems, setBuilderItems] = useState([]);
  const addToBuilder = (item) => {
    // TODO: add a check to not add duplicates
    setBuilderItems(oldItems => oldItems.concat([item]));
  }
  const [showBuilder, setShowBuilder] = useState(false);
  const showModal = () => { setShowBuilder(true); };
  const hideModal = () => { setShowBuilder(false); };
  const [focusItem, setFocusItem] = useState({});
  const [showProductModal, setShowProductModal] = useState(false);
  const showPopUpModal = () => { setShowProductModal(true); };
  const hidePopUpModal = () => { setShowProductModal(false); };
  const { loading: productLoading, error: productError, data: productData } = useQuery(PRODUCTS_QUERY, {
    variables: { application: currentFilter, productType: currentPType, shape: currentShape, stock: currentStock },
  });
  if (productLoading) {
    console.log("reload");
    return <div>Fetching products.....</div>
  }
  else if (productError) {
    return <div>Error fetching products</div>
  }
  else {
    const items = productData.allProducts.filter((product => {
      const lowerProduct = product.description.toLowerCase();
      const id = product.itemNo.toLowerCase();
      // TODO: this is throwing a warning
      return !(currentSearch.every((keyword) => { return (lowerProduct.indexOf(keyword.toLowerCase()) == -1 && id.localeCompare(keyword.toLowerCase()) != 0) }));
    }));
    // TODO: The buttons do nothing! 
    return (
      <div>
        <div className="options-bar">
          <Search onSearch={changeSearch} defaultText={currentSearch} style={{ display: "inline" }} />
          <Button variant="secondary" style={{ width: "100px" }} className="spaced-button" onClick={toggleFilters}>Filters</Button>
          <Button variant="secondary" style={{ width: "200px" }} className="spaced-button" onClick={showModal}>Saved Items ({builderItems.length})</Button>
        </div>
        <div className="separator"></div>
        <Row>
          {items.map(item => <Product key={item.id} item={item} addToBuilder={addToBuilder} setFocusItem={setFocusItem} showPopUpModal={showPopUpModal} />)}
        </Row>
        <PdfBuilderOverlay show={showBuilder} builderItems={builderItems} handleClose={hideModal} />
        <ProductPopUp show={showProductModal} item={focusItem} addToBuilder={addToBuilder} onHide={() => hidePopUpModal()} />
      </div>
    )
  }
}

export default ProductsList;


const Search = ({ onSearch, defaultText }) => {
  const [currText, setText] = useState(defaultText);

  const doSearch = () => {
    var keywords = (currText.replace(/\n/gi, " ").trim().split(/[ ]+/));
    onSearch(keywords);
  }
  console.log(currText);
  return <InputGroup>
    <FormControl
      placeholder="Search by item ID or description"
      aria-label="Recipient's username"
      value={currText}
      onChange={(event) => (setText(event.target.value))}
    />
    <InputGroup.Append>
      <Button variant="secondary" onClick={doSearch}>Search</Button>
    </InputGroup.Append>
  </InputGroup>
}

// TODO: what to do w/ addToBuilder?; display ItemNo? 
const Product = ({ item, addToBuilder, setFocusItem, showPopUpModal }) =>
  <Col xs={12} sm={6} md={4} className="single-product-wrapper" onClick={() => {
    setFocusItem(item);
    showPopUpModal();
  }}>
    <Card.Img
      src="http://pennyplate.com/wp-content/uploads/2014/07/Circular-Danish-black-571x428.png"
      alt="..."
      style={{ background: "#000" }}
    >
      {/* TODO: Does something go between Card.Img */}
    </Card.Img>
    <div className="single-product-text">
      {/* <h4>{item.itemNo}</h4> */}
      <h4 className="single-product-description">{item.description}</h4>
      {/* <Button variant="primary" onClick={() => addToBuilder(item)}>Add to PDF Builder</Button> */}
    </div>
  </Col>;

// TODO: Make a query so this displays real data
const ProductPopUp = ({ show, item, addToBuilder, onHide }) => {
  console.log(item.id)
  const { loading: infoLoading, error: infoError, data: infoData } = useQuery(FOCUS_PRODUCT_INFO_QUERY, {
    variables: { itemId: item.id },
  });
  // if (infoLoading) {
  //   return (
  //     <div className={show ? "popup-wrapper display-block" : "popup-wrapper display-none"}>
  //       <section className="main-popup">
  //         <Button variant="primary" onClick={onHide} style={{ float: "right" }}>Close</Button>
  //         <div className="popup-content">
  //           <p>Fetching products.....</p>
  //         </div>
  //       </section>
  //     </div>
  //   )
  // }
  // else if (infoError) {
  //   return <div className={show ? "popup-wrapper display-block" : "popup-wrapper display-none"}>
  //     <section className="main-popup">
  //       <Button variant="primary" onClick={onHide} style={{ float: "right" }}>Close</Button>
  //       <div className="popup-content">
  //         <p>Error fetching products</p>
  //       </div>
  //     </section>
  //   </div>
  // }
  if (infoLoading) {
    return (<></>)
  }
  else if (infoError) {
    return (<></>)
  }
  else {
    const info = infoData.products;
    console.log("item info recieved!");
    console.log(info);
    return (
      <Modal
        show={show}
        // dialogClassName="modal-90w"
        size="xl"
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
        </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
    // return <div className={show ? "popup-wrapper display-block" : "popup-wrapper display-none"}>
    //   <section className="main-popup">
    //     <Button variant="primary" onClick={handleClose} style={{ float: "right" }}>Close</Button>
    //     <div className="popup-content">
    //       <h1>{item.description}</h1>
    //       <p><em>{item.itemNo}</em></p>
    //       <Row>
    //         <Col xs={12} md={7}>
    //           <img
    //             src="http://pennyplate.com/wp-content/uploads/2014/07/Circular-Danish-black-571x428.png"
    //             className="product-popup-image"
    //             alt="..."
    //           />
    //         </Col>
    //         <Col xs={12} md={5}>
    //           <p>
    //             <b>Product Type:</b> {info.productType}<br />
    //             <b>Shape:</b> {info.shape}<br />
    //             <b>Application:</b> {spaceWords("" + info.application)}<br />
    //             <b>Top In:</b> {info.topIn}<br />
    //             <b>Top Out:</b> {info.topOut}<br />
    //             <b>Bottom:</b> {info.bottom}<br />
    //             <b>Vertical Depth:</b> {info.depth}<br />
    //             <b>Capacity (Fl. Oz.):</b> {info.panCapacity}<br />
    //             <b>Rim:</b> {info.rimStyle}<br />

    //             <b>Case Size (Ft. cubed):</b> {info.caseCubeFt}<br />
    //             <b>Case Weight (Lbs):</b> {info.caseWeight}<br />
    //             <b>Pans per Case:</b> {info.pansPerCase}<br />

    //             <b>Pallet Weight:</b> {info.palletWeight}<br />

    //             <b>Stock Type:</b> {spaceWords("" + info.stockType)}<br />
    //             <b>Order Quantity:</b> {info.orderQuantity}<br />

    //             <b>HI:</b> {info.hi}<br />
    //             <b>TI:</b> {info.ti}<br />
    //           </p>
    //           <Button variant="primary" onClick={() => addToBuilder(item)}>Save Item</Button>
    //         </Col>
    //       </Row>
    //     </div>
    //   </section>
    // </div>
  }
}

const spaceWords = (name) => {
  return name.replace(/([A-Z])/g, " $1");
}