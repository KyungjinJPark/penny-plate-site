import { useCallback, useState } from "react";
import { Container, Button } from "react-bootstrap";

import "./productspage.css";
import { FILTER_QUERY, PTYPE_QUERY, SHAPE_QUERY, STOCK_QUERY } from "./queries";
import Filters from "./Filters";
import ProductsList from "./ProductList";

const ProductsPage = () => {
  // TODO: why is it named "Filter" when its only for the application?
  const [currentFilter, setFilter] = useState([]);
  const [currentPType, setPType] = useState([]);
  const [currentShape, setShape] = useState([]);
  const [currentStock, setStock] = useState([]);
  const [currentSearch, setSearch] = useState("");

  const changeFilters = useCallback(
    (newFilters) => {
      setFilter(newFilters);
    },
    []
  );

  const changePType = useCallback(
    (newTypes) => {
      setPType(newTypes);
    },
    []
  );

  const changeShape = useCallback(
    (newShapes) => {
      setShape(newShapes);
    },
    []
  );

  const changeStock = useCallback(
    (newStocks) => {
      setStock(newStocks);
    },
    []
  );

  const changeSearch = useCallback(
    (newSearch) => {
      setSearch(newSearch);
    },
    []
  );


  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(old => !old);
  };

  return (<div className="products-page-wrapper">
    <div
      className="products-sidebar"
      style={{ display: showFilters ? "block" : "none" }}
    >
      <h1>Filters</h1>
      <Button
        variant="primary"
        onClick={toggleFilters}
      >
        Close Filters
      </Button>
      <div className="separator"></div>
      <div className="filter-wrapper">
        <Filters onSend={changeFilters} filterType={"Applications"} query={FILTER_QUERY} />
        <Filters onSend={changePType} filterType={"Product Types"} query={PTYPE_QUERY} />
        <Filters onSend={changeShape} filterType={"Shapes"} query={SHAPE_QUERY} />
        <Filters onSend={changeStock} filterType={"Stock Types"} query={STOCK_QUERY} />
      </div>
    </div>
    <Container className="normal-container">
      <h1>Products</h1>
      <ProductsList
        showFilters={showFilters}
        toggleFilters={toggleFilters}
        currentFilter={currentFilter}
        currentPType={currentPType}
        currentShape={currentShape}
        currentStock={currentStock}
        currentSearch={currentSearch}
        changeSearch={changeSearch}
      />
    </Container>
  </div>)
}

export default ProductsPage;