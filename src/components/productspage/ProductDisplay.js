import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-apollo";
import { Button, Card, Row, Col, InputGroup, FormControl, Modal } from "react-bootstrap";

import { PRODUCTS_QUERY, FOCUS_PRODUCT_INFO_QUERY } from "./queries";
import PdfBuilderOverlay from "./PdfBuilderOverlay";

const ProductsList = ({ toggleFilters, currentFilter, currentPType, currentShape, currentStock, currentSearch, changeSearch }) => {
  const [savedItems, setSavedItems] = useState([]);
  const addToSavedItems = (item) => {
    setSavedItems((oldItems) => {
      if (!oldItems.includes(item)) {
        let newItems = oldItems.concat([item]);
        return newItems;
      }
      return oldItems;
    });
  }
  const removeSavedItem = (itemId) => {
    setSavedItems((oldItems) => {
      return oldItems.filter((item) => { return item.id !== itemId });
    });
  }
  const [showSavedItemsModal, setShowSavedItemsModal] = useState(false);
  const setSavedItemsModalVisible = () => { setShowSavedItemsModal(true); };
  const hideSavedItemsModal = () => { setShowSavedItemsModal(false); };
  const [focusItem, setFocusItem] = useState({});
  const [showProductModal, setShowProductModal] = useState(false);
  const setProductModalVisible = () => { setShowProductModal(true); };
  const hidePopUpModal = () => { setShowProductModal(false); };
  const { loading: productLoading, error: productError, data: productData } = useQuery(PRODUCTS_QUERY, {
    variables: {
      grabCount: 5,
      skipCount: 0,
      application: currentFilter,
      productType: currentPType,
      shape: currentShape,
      stock: currentStock
    },
  });
  if (productLoading) {
    console.log("reload");
    return <div>Fetching products...</div>
  }
  else if (productError) {
    return <div>Error fetching products</div>
  }
  else {
    console.log(productData.allProducts);
    const items = productData.allProducts.filter((product => {
      const lowerProduct = product.description.toLowerCase();
      const id = product.itemNo.toLowerCase();
      var keywords = (currentSearch.replace(/\n/gi, " ").trim().split(/[ ]+/));
      // TODO: this is throwing a warning
      return !(keywords.every((keyword) => { return (lowerProduct.indexOf(keyword.toLowerCase()) === -1 && id.localeCompare(keyword.toLowerCase()) !== 0) }));
    }));
    // TODO: The buttons do nothing! 
    return (
      <div>
        <div className="options-bar">
          <Search onSearch={changeSearch} defaultText={currentSearch} style={{ display: "inline" }} />
          <Button variant="secondary" style={{ width: "100px" }} className="spaced-button" onClick={toggleFilters}>Filters</Button>
          <Button variant="secondary" style={{ width: "200px" }} className="spaced-button" onClick={setSavedItemsModalVisible}>Saved Items ({savedItems.length})</Button>
        </div>
        <div className="separator"></div>
        <Row>
          {items.map(item => <Product key={item.id} item={item} addToSavedItems={addToSavedItems} setFocusItem={setFocusItem} setProductModalVisible={setProductModalVisible} />)}
        </Row>
        <PdfBuilderOverlay show={showSavedItemsModal} onHide={hideSavedItemsModal} savedItems={savedItems} removeSavedItem={removeSavedItem} />
        <ProductPopUp show={showProductModal} item={focusItem} addToSavedItems={addToSavedItems} onHide={hidePopUpModal} />
      </div>
    )
  }
}

export default ProductsList;


const Search = ({ onSearch, defaultText }) => {
  const [currText, setText] = useState(defaultText);

  const doSearch = () => {
    onSearch(currText);
  }
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

// TODO: what to do w/ addToSavedItems?; display ItemNo? 
const Product = ({ item, addToSavedItems, setFocusItem, setProductModalVisible }) =>
  <Col xs={12} sm={6} md={4} className="single-product-wrapper" onClick={() => {
    setFocusItem(item);
    setProductModalVisible();
  }}>
    <Card.Img
      src="http://pennyplate.com/wp-content/uploads/2014/07/Circular-Danish-black-571x428.png"
      alt="..."
      style={{ background: "#000" }}
    />
    <div className="single-product-text">
      {/* <h4>{item.itemNo}</h4> */}
      <h4 className="single-product-description">{item.description}</h4>
      {/* <Button variant="primary" onClick={() => addToSavedItems(item)}>Add to PDF Builder</Button> */}
    </div>
  </Col>;

// TODO: Make a query so this displays real data
const ProductPopUp = ({ show, item, addToSavedItems, onHide }) => {
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
          <h4>Fetching products.....</h4>
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
          <h4>Could not fetch products.</h4>
          <Link to="/catalog"><h4>Please use the digital catalog</h4></Link>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  else {
    const info = infoData.products;
    console.log("item info recieved!");
    console.log(info);
    return (
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
                <img
                  src="http://pennyplate.com/wp-content/uploads/2014/07/Circular-Danish-black-571x428.png"
                  className="product-popup-image"
                  alt="..."
                />
              </Col>
              <Col lg={12} xl={6}>
                <p>
                  <b>Application(s):</b> {spaceWords("" + info.application)}<br />
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
                    onClick={() => addToSavedItems(item)}
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
          <Button variant="success" onClick={() => addToSavedItems(item)}>Save Item</Button>
          <Button variant="primary" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const spaceWords = (name) => {
  return name.replace(/([A-Z])/g, " $1");
}