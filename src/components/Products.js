
import { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { Button, Card } from 'react-bootstrap';
import { jsPDF } from "jspdf";

import { PRODUCTS_QUERY, FILTER_QUERY, PTYPE_QUERY, SHAPE_QUERY, STOCK_QUERY } from './all-products/queries';
import logoImg from "../imgs/pennyplate-logo.png"

const Filters = ({ onSend, filterType, query }) => {
  const [currFilters, setCurrFilters] = useState([]);
  const { loading: filterLoading, error: filterError, data: filterData } = useQuery(query);
  const changeFilters = (checked, name) => {
    const newFilters = [...currFilters];
    if (checked) {
      if (newFilters.indexOf(name) === -1) {
        newFilters.push(name);
      }
    }
    else {
      const loc = newFilters.indexOf(name);
      if (loc !== -1) {
        newFilters.splice(loc, 1);
      }
    }
    setCurrFilters(newFilters);
  }
  useEffect((allFilters) => {
    if (!(filterLoading || filterError)) {
      if (currFilters.length === 0) {
        onSend(allFilters);
      }
      else {
        onSend(currFilters);
      }
    }
  },
    [filterLoading, filterError, currFilters, onSend]);
  if (filterLoading) return <div>Fetching {filterType} filters.....</div>
  if (filterError) return <div>Error fetching {filterType} filters</div>
  const filters = filterData.__type.enumValues;
  const allFilters = filters.map(filter => filter.name);
  return (
    <>
      <p>{filterType}</p>
      <ul>
        {filters.map(filter => <li key={filter.name}><input type="checkbox" onChange={(event) => { changeFilters(event.target.checked, filter.name) }} />{filter.name}</li>)}
      </ul>
    </>
  )
}

const ProductsList = ({ currentFilter, currentPType, currentShape, currentStock }) => {
  const [cartitems, setCartItems] = useState([]);
  const addToCart = (item) => {
    setCartItems(oldCart => oldCart.concat([item]));
  }
  const [showCart, setShowCart] = useState(false);
  const showModal = () => {
    setShowCart(true);
  };
  const hideModal = () => {
    setShowCart(false);
  };
  const { loading: productLoading, error: productError, data: productData } = useQuery(PRODUCTS_QUERY, {
    variables: { application: currentFilter, productType: currentPType, shape: currentShape, stock: currentStock },
  });
  if (productLoading) {
    console.log("reload");
    return <div>Fetching products.....</div>
  }
  if (productError) return <div>Error fetching products</div>
  const items = productData.allProducts;
  return (
    <div>
      <button onClick={showModal}>PDF Items ({cartitems.length})</button>
      <Cart show={showCart} cartitems={cartitems} handleClose={hideModal} />
      <div className="products-list">
        {items.map(item => <Product key={item.id} item={item} addToCart={addToCart} />)}
      </div>
    </div>
  )
}

const Products = () => {
  const [currentFilter, setFilter] = useState([]);
  const [currentPType, setPType] = useState([]);
  const [currentShape, setShape] = useState([]);
  const [currentStock, setStock] = useState([]);
  const changeFilters = (newFilters) => {
    setFilter(newFilters);
  }
  const changePType = (newTypes) => {
    setPType(newTypes);
  }
  const changeShape = (newShapes) => {
    setShape(newShapes);
  }
  const changeStock = (newStocks) => {
    setStock(newStocks);
  }
  return (<div className='products-wrapper'>
    <div className='products-sidebar'>
      <h3>Filters</h3>
      <Filters onSend={changeFilters} filterType={"Applications"} query={FILTER_QUERY} />
      <Filters onSend={changePType} filterType={"Product Types"} query={PTYPE_QUERY} />
      <Filters onSend={changeShape} filterType={"Shapes"} query={SHAPE_QUERY} />
      <Filters onSend={changeStock} filterType={"Stock Types"} query={STOCK_QUERY} />
    </div>
    <div className='products-content'>
      <ProductsList currentFilter={currentFilter} currentPType={currentPType} currentShape={currentShape} currentStock={currentStock} />
    </div>
  </div>
  );

};

export default Products;


const Product = ({ item, addToCart }) =>
  <div className="single-product-wrapper">
    <Card.Img src="https://www.teamcorp.us/wp-content/uploads/2018/09/9600.png" alt="..."></Card.Img>
    <div className="single-product-text">
      <h4>{item.itemNo}</h4>
      <h4>{item.description}</h4>
      {/* <Card.Text>{item.application}</Card.Text> */}
      <Button variant="primary" onClick={() => addToCart(item)}>Add to PDF Builder</Button>
    </div>
  </div>;

const Cart = ({ show, cartitems, handleClose }) => {
  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
      <section className="main-modal">
        {cartitems.map(item =>
          <div key={item.id} className="card" style={{ width: "18rem" }}>
            {/* <img src={item.image.url} className="card-img-top" alt="shirt" /> */}
            <div className="card-body">
              <h5 className="card-title">{item.itemNo}</h5>
              <h6 className="card-title">{item.description}</h6>
            </div>
          </div>
        )}
        <p>Total items: {cartitems.length}</p>
        <button className="btn btn-success ml-2" onClick={() => pdfFromCart(cartitems)}>pdf</button>
        <button className="btn btn-warning ml-2" onClick={handleClose}>close</button>
      </section>
    </div>
  );
}

const pdfFromCart = (cartitems) => {
  const doc = new jsPDF("portrait", "in", "letter");


  const path = require('path');

  var img = new Image();
  img.src = logoImg;
  doc.addImage(img, "PNG", 0.65, 0.5, 1, 1.5);

  doc.setFontSize(12);
  doc.setTextColor("#000000");
  doc.text("www.pennyplate.com", 6, 1);

  doc.line(0.5, 2, 8, 2, "F");

  for (let i = 0; i < cartitems.length; i++) {
    doc.text(cartitems[i].itemNo, 0.65, i * 1 + 4);
  }

  doc.line(0.5, 9.5, 8, 9.5, "F");

  doc.setFontSize(16);
  doc.setTextColor("#000000");
  doc.text("Contact Us", 0.5, 9.75);

  doc.rect(0.5, 10.25, 7.5, 0.3, "F");

  doc.setFontSize(10);
  doc.setTextColor("#FFFFFF");
  doc.text("Page 0 of 0", 0.6, 10.45);


  doc.save("PennyPlate_Products_PDF.pdf");
}