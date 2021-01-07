import { useState } from "react";
import { useQuery } from "react-apollo";
import { Button, Card, Row, Col } from "react-bootstrap";

import { PRODUCTS_QUERY, FOCUS_PRODUCT_INFO_QUERY } from "./queries";
import PdfBuilderOverlay from "./PdfBuilderOverlay";

const ProductsList = ({ currentFilter, currentPType, currentShape, currentStock, currentSearch, changeSearch }) => {
  const [builderItems, setBuilderItems] = useState([]);
  const addToBuilder = (item) => {
    // TODO: add a check to not add duplicates
    setBuilderItems(oldItems => oldItems.concat([item]));
  }
  const [showBuilder, setShowBuilder] = useState(false);
  const showModal = () => {
    setShowBuilder(true);
  };
  const hideModal = () => {
    setShowBuilder(false);
  };
  const [focusItem, setFocusItem] = useState({});
  const [showProductPopUP, setShowProductPopUP] = useState(false);
  const showPopUpModal = () => {
    setShowProductPopUP(true);
  };
  const hidePopUpModal = () => {
    setShowProductPopUP(false);
  };

  const searchStringArray = currentSearch.map(keyword => ("{description contains: \"" + keyword + "\"}"));
  const searchString = searchStringArray.join(",");
  console.log(searchString);
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
        <Button variant="secondary">Filters</Button>{" "}
        <Button variant="secondary" onClick={showModal}>PDF Items ({builderItems.length})</Button>{" "}
        <Search onSearch={changeSearch} />{" "}
        <div className="separator"></div>
        <div className="products-list">
          {items.map(item => <Product key={item.id} item={item} addToBuilder={addToBuilder} setFocusItem={setFocusItem} showPopUpModal={showPopUpModal} />)}
        </div>
        <PdfBuilderOverlay show={showBuilder} builderItems={builderItems} handleClose={hideModal} />
        <ProductPopUp show={showProductPopUP} item={focusItem} addToBuilder={addToBuilder} handleClose={hidePopUpModal} />
      </div>
    )
  }
}

export default ProductsList;


const Search = ({ onSearch }) => {
  const [currText, setText] = useState("");

  const doSearch = () => {
    var keywords = (currText.replace(/\n/gi, " ").trim().split(/[ ]+/));
    onSearch(keywords);
  }

  return <>
    <input type="text" onChange={(event) => (setText(event.target.value))}></input>{" "}
    <Button variant="secondary" onClick={doSearch}>Search</Button>
  </>
}

// TODO: what to do w/ addToBuilder?; display ItemNo? 
const Product = ({ item, addToBuilder, setFocusItem, showPopUpModal }) =>
  <div className="single-product-wrapper" onClick={() => {
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
  </div>;

// TODO: Make a query so this displays real data
const ProductPopUp = ({ show, item, addToBuilder, handleClose }) => {
  console.log(item.id)
  const { loading: infoLoading, error: infoError, data: infoData } = useQuery(FOCUS_PRODUCT_INFO_QUERY, {
    variables: { itemId: item.id },
  });
  if (infoLoading) {
    return (
      <div className={show ? "popup-wrapper display-block" : "popup-wrapper display-none"}>
        <section className="main-popup">
          <Button variant="primary" onClick={handleClose} style={{ float: "right" }}>Close</Button>
          <div className="popup-content">
            <p>Fetching products.....</p>
          </div>
        </section>
      </div>
    )
  }
  else if (infoError) {
    return <div className={show ? "popup-wrapper display-block" : "popup-wrapper display-none"}>
      <section className="main-popup">
        <Button variant="primary" onClick={handleClose} style={{ float: "right" }}>Close</Button>
        <div className="popup-content">
          <p>Error fetching products</p>
        </div>
      </section>
    </div>
  }
  else {
    const info = infoData;
    console.log(info);
    // TODO: The buttons do nothing! 
    return <div className={show ? "popup-wrapper display-block" : "popup-wrapper display-none"}>
      <section className="main-popup">
        <Button variant="primary" onClick={handleClose} style={{ float: "right" }}>Close</Button>
        <div className="popup-content">
          <h1>{item.description}</h1>
          <p><em>{item.itemNo}</em></p>
          <Row>
            <Col xs={12} md={7}>
              <img
                src="http://pennyplate.com/wp-content/uploads/2014/07/Circular-Danish-black-571x428.png"
                className="product-popup-image"
                alt="..."
              />
            </Col>
            <Col xs={12} md={5}>
              <p><b>Top Out:</b> 9″<br />
                <b>Top In:</b> 8 5/8″<br />
                <b>Bottom:</b> 8 3/16″<br />
                <b>Vertical Depth:</b> 53/64″<br />
                <b>Capacity (Fl. Oz.):</b> 19.27<br />
                <b>Rim:</b> FC<br />
                <b>Lbs.:</b> 24<br />
                <b>Case Cube:</b> 5.20<br />
                <b>Pack Size:</b> 750<br />
                <b>Cases/Pallet:</b> 16<br />
              </p>
              <Button variant="primary" onClick={() => addToBuilder(item)}>Add to PDF Builder</Button>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  }
}