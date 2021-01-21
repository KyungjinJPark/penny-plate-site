import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-apollo";
import { Button, Card, Row, Col, InputGroup, FormControl, Modal, Carousel } from "react-bootstrap";

import { PRODUCTS_QUERY, FOCUS_PRODUCT_INFO_QUERY } from "./queries";
import PdfBuilderOverlay from "./PdfBuilderOverlay";

const ProductsList = ({ showFilters, toggleFilters, currentFilter, currentPType, currentShape, currentStock, currentSearch, changeSearch }) => {
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

  const [pageNum, setPageNum] = useState(0);
  const decPage = () => {
    setPageNum((oldpage) => {
      if (oldpage == 0) {
        return oldpage;
      }
      else {
        return oldpage - 1;
      }
    });
  }
  const incPage = () => {
    setPageNum((oldpage) => oldpage + 1);
  }

  const { loading: productLoading, error: productError, data: productData } = useQuery(PRODUCTS_QUERY, {
    variables: {
      grabCount: 16,
      skipCount: pageNum * 15,
      application: currentFilter,
      productType: currentPType,
      shape: currentShape,
      stock: currentStock,
      keywords: (currentSearch.replace(/\n/gi, " ").trim()),
      itemNo: (currentSearch.replace(/\n/gi, " ").trim())
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
    console.log((currentSearch));
    console.log(productData.allProducts);
    const items = productData.allProducts;
    return (
      <div>
        <div className="options-bar">
          <Search onSearch={changeSearch} defaultText={currentSearch} style={{ display: "inline" }} />
          <Button variant={showFilters ? "primary" : "secondary"} style={{ width: "100px" }} className="spaced-button" onClick={toggleFilters}>Filters</Button>
          <Button variant="secondary" style={{ width: "200px" }} className="spaced-button" onClick={setSavedItemsModalVisible}>Saved Items ({savedItems.length})</Button>
        </div>
        <div className="separator"></div>
        <Row>
          {items.slice(0, 15).map(item => <Product key={item.id} item={item} addToSavedItems={addToSavedItems} setFocusItem={setFocusItem} setProductModalVisible={setProductModalVisible} />)}
        </Row>
        <div style={{ float: "right", marginTop: "2em" }}>
          <Button
            variant={(pageNum > 0) ? "primary" : "secondary"}
            onClick={(pageNum > 0) ? decPage : () => { }}
          >
            Previous
          </Button>
          <h4 style={{ display: "inline" }}>{" "}Page {pageNum + 1}{" "}</h4>
          <Button
            variant={(items.length == 16) ? "primary" : "secondary"}
            onClick={(items.length == 16) ? incPage : () => { }}
          >
            Next
          </Button>
        </div>
        <PdfBuilderOverlay show={showSavedItemsModal} onHide={hideSavedItemsModal} savedItems={savedItems} removeSavedItem={removeSavedItem} />
        <ProductPopUp show={showProductModal} item={focusItem} addToSavedItems={addToSavedItems} onHide={hidePopUpModal} />
      </div>
    )
  }
}

export default ProductsList;


const Search = ({ onSearch, defaultText }) => {
  const [currText, setText] = useState(defaultText);
  const changeText = (value) => {
    setText(value.replaceAll(" ", ""));
  }
  const doSearch = () => {
    onSearch(currText);
  }
  const handleKeyPress = (target) => {
    if (target.charCode == 13) {
      doSearch();
    }
  }
  return <InputGroup>
    <FormControl
      placeholder="Search by item ID or a keyword in the description"
      value={currText}
      onChange={(event) => (changeText(event.target.value))}
      onKeyPress={handleKeyPress}
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
      src={item.photos[0].url}
      alt="..."
      style={{ boxShadow: "2px 4px 7px #AAAAAA" }}
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
                {(info.photos.length > 1)
                  ? <Carousel style={{ color: "#000" }}>
                    {info.photos.map((resource) => <Carousel.Item>
                      <img
                        src={resource.url}
                        className="product-popup-image"
                        alt="product photo"
                      />
                    </Carousel.Item>)}
                  </Carousel>
                  : <img
                    src={info.photos[0].url}
                    className="product-popup-image"
                    alt="product photo"
                  />}
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
                    onClick={() => addToSavedItems(info)}
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
          <Button variant="success" onClick={() => addToSavedItems(info)}>Save Item</Button>
          <Button variant="primary" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const spaceWords = (name) => {
  return name.replace(/([A-Z])/g, " $1");
}