import { useState } from 'react';

import { Query } from 'react-apollo';
import { Button, Card } from 'react-bootstrap';

import { PRODUCTS_QUERY, FILTER_QUERY } from './all-products/queries';

import { jsPDF } from "jspdf";

import logoImg from "../imgs/pennyplate-logo.png"

const Products = () => {
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

  return (<div className='products-wrapper'>
    <div className='products-sidebar'>
      <h3>Filters</h3>
      <Query query={FILTER_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching filters.....</div>
          if (error) return <div>Error fetching filters</div>

          console.log(data);
          const filters = data.__type.enumValues;
          return (
            <>
              <p>Applications</p>
              <ul>
                {filters.map(filter => <li key={filter.name}><input type="checkbox" />{filter.name}</li>)}
              </ul>
            </>
          )
        }}
      </Query>
    </div>
    <div className='products-content'>
      <Query query={PRODUCTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            console.log("reload");
            return <div>Fetching products.....</div>
          }
          if (error) return <div>Error fetching products</div>

          console.log(data);
          const items = data.allProducts;
          return (
            <main>
              <button onClick={showModal}>PDF Items ({cartitems.length})</button>
              <Cart show={showCart} cartitems={cartitems} handleClose={hideModal} />
              {items.map(item => <Product key={item.id} item={item} addToCart={addToCart} />)}
            </main>
          )
        }}
      </Query>
    </div>
  </div>
  );

};

export default Products;


const Product = ({ item, addToCart }) =>
  <Card style={{ width: "18rem" }}>
    <Card.Img src="https://www.teamcorp.us/wp-content/uploads/2018/09/9600.png" alt="..."></Card.Img>
    <Card.Body>
      <Card.Title>{item.itemNo}</Card.Title>
      <Card.Text>{item.description}</Card.Text>
      <Card.Text>{item.application}</Card.Text>
      <Button variant="primary" onClick={() => addToCart(item)}>Add to PDF Builder</Button>
    </Card.Body>
  </Card>;

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