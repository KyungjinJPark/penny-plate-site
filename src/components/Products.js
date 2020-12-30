import { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { Button, Card } from 'react-bootstrap';

import { PRODUCTS_QUERY, FILTER_QUERY, PTYPE_QUERY } from './all-products/queries';

import { jsPDF } from "jspdf";

const Filters = ({onSend, filterType, query}) => {
  const [currFilters, setCurrFilters] = useState([]);
  const {loading: filterLoading, error: filterError, data: filterData} = useQuery(query);
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
    if (!(filterLoading || filterError )) {
      if (currFilters.length === 0) {
        onSend(allFilters);
      }
      else {
        onSend(currFilters);
      }
    }},
    [filterLoading, filterError, currFilters]);
  if (filterLoading) return <div>Fetching {filterType} filters.....</div>
  if (filterError) return <div>Error fetching {filterType} filters</div>
  const filters = filterData.__type.enumValues;
  const allFilters = filters.map(filter => filter.name);
  return (
    <>
      <p>{filterType}</p>
        <ul>
          {filters.map(filter => <li key={filter.name}><input type="checkbox" onChange={(event) => {changeFilters(event.target.checked, filter.name)}}/>{filter.name}</li>)}
        </ul>
    </>
  )  
}

const FilterList = () => {

}

const ProductsList = ({currentFilter, currentPType}) => {
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
  const {loading: productLoading, error: productError, data: productData} = useQuery(PRODUCTS_QUERY, {
    variables: { application: currentFilter,  productType: currentPType },
  });
  if (productLoading) {
    console.log("reload");
    return <div>Fetching products.....</div>
  }
  if (productError) return <div>Error fetching products</div>
  const items = productData.allProducts;
  return (
    <main>
      <button onClick={showModal}>PDF Items ({cartitems.length})</button>
      <Cart show={showCart} cartitems={cartitems} handleClose={hideModal} />
      {items.map(item => <Product key={item.id} item={item} addToCart={addToCart} />)}
    </main>
  )
}

const Products = () => {
  const [currentFilter, setFilter] = useState([]);
  const [currentPType, setPType] = useState([]);
  const changeFilters = (newFilters) => {
    setFilter(newFilters);
  }
  const changePType = (newTypes) => {
    setPType(newTypes);
  }
  return (<div className='products-wrapper'>
    <div className='products-sidebar'>
      <h3>Filters</h3>
        <Filters onSend={changeFilters} filterType={"Applications"} query={FILTER_QUERY}/>
        <Filters onSend={changePType} filterType={"Product Types"} query={PTYPE_QUERY}/>
    </div>
    <div className='products-content'>
      <ProductsList currentFilter={currentFilter} currentPType={currentPType}/>
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

  console.log("for begin");
  for (let i = 0; i < cartitems.length; i++) {
    console.log("for iteration");
    console.log(cartitems[i].itemNo);
    doc.text(cartitems[i].itemNo, 0.5, i * 1 + 0.5);
  }
  console.log("for end");

  doc.save("a4.pdf");
}