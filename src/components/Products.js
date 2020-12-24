import { useState } from 'react';

import { Query } from 'react-apollo';

import PRODUCTS_QUERY from './all-products/index';

const Products = (props) => {
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

  return (
    <Query query={PRODUCTS_QUERY}>
      {({ loading, error, data }) => {

        if (loading) return <div>Fetching products.....</div>
        if (error) return <div>Error fetching products</div>

        console.log(data);
        const items = data.productsPlural;
        return (
          <main>
            <button onClick={showModal}>Show cart ({cartitems.length})</button>
            <Cart show={showCart} cartitems={cartitems} handleClose={hideModal} />
            {items.map(item => <Product item={item} addToCart={addToCart} />)}
          </main>
        )
      }}
    </Query>
  );

};

export default Products;


const Product = ({ item, addToCart }) =>
  <div>
    <h3>{item.itemNo}</h3>
    <h1></h1>
    <p>{item.description}</p>
    <button onClick={() => addToCart(item)}>Add to PDF Builder</button>
  </div>;

const Cart = ({ show, cartitems, handleClose }) => {
  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
      <section className="main-modal">
        {cartitems.map(item =>
          <div className="card" style={{ width: "18rem" }}>
            {/* <img src={item.image.url} className="card-img-top" alt="shirt" /> */}
            <div className="card-body">
              <h5 className="card-title">{item.itemNo}</h5>
              <h6 className="card-title">$ {item.description}</h6>
            </div>
          </div>
        )}
         Total items: {cartitems.length}
        <button className="btn btn-warning ml-2" onClick={handleClose}>close</button>
      </section>
    </div>
  );
}