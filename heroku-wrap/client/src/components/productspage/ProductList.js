import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-apollo";
import { Button, Card, Row, Col, InputGroup, FormControl } from "react-bootstrap";

import { PRODUCTS_QUERY } from "./queries";
import PdfBuilderOverlay from "./PdfBuilderOverlay";
import ProductPopUp from "./ProductInfoOverlay"

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
      if (oldpage === 0) {
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
    return <div>
      <div className="separator"></div>
      <h4>Fetching products...</h4>
      <h4>If the products do not load, please retry or <Link to="/catalog">use the digital catalog</Link></h4>
    </div>
  }
  else if (productError) {
    return <div>
      <div className="separator"></div>
      <h4>Could not fetch products.</h4>
      <h4>Please retry or <Link to="/catalog">use the digital catalog</Link></h4>
    </div>
  }
  else {
    const items = productData.allProducts;
    return (
      <div>
        <InputGroup>
          <Search onSearch={changeSearch} defaultText={currentSearch} style={{ display: "inline" }} />
          <InputGroup.Append>
            <Button
              variant={showFilters ? "primary" : "secondary"}
              className="spaced-button"
              onClick={toggleFilters}
            >
              Filters
            </Button>
          </InputGroup.Append>
          <InputGroup.Append>
            <Button
              variant="secondary"
              className="spaced-button"
              onClick={setSavedItemsModalVisible}
            >
              Saved ({savedItems.length})
            </Button>
          </InputGroup.Append>
        </InputGroup>
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
            variant={(items.length === 16) ? "primary" : "secondary"}
            onClick={(items.length === 16) ? incPage : () => { }}
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
    if (target.charCode === 13) {
      doSearch();
    }
  }
  return <>
    <FormControl
      placeholder="Search by item ID or a keyword in the description"
      value={currText}
      onChange={(event) => (changeText(event.target.value))}
      onKeyPress={handleKeyPress}
    />
    <InputGroup.Append>
      <Button variant="secondary" onClick={doSearch}>Search</Button>
    </InputGroup.Append>
  </>
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
      style={{ boxShadow: "1px 3px 8px #AAAAAA" }}
    />
    <div className="single-product-text">
      {/* <h4>{item.itemNo}</h4> */}
      <h4 className="single-product-description">{item.description}</h4>
      {/* <Button variant="primary" onClick={() => addToSavedItems(item)}>Add to PDF Builder</Button> */}
    </div>
  </Col>;