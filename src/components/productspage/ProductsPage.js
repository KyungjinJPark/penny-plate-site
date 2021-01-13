import { useState } from "react";

import "./productspage.css";
import { FILTER_QUERY, PTYPE_QUERY, SHAPE_QUERY, STOCK_QUERY } from "./queries";
import Filters from "./Filters";
import ProductsList from "./ProductDisplay";

const ProductsPage = () => {
  // TODO: why is it named "Filter" when its only for the application?
  const [currentFilter, setFilter] = useState([]);
  const [currentPType, setPType] = useState([]);
  const [currentShape, setShape] = useState([]);
  const [currentStock, setStock] = useState([]);
  const [currentSearch, setSearch] = useState([""]);
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
  const changeSearch = (newSearch) => {
    setSearch(newSearch);
  }

  console.log(currentFilter);
  return (
    <div className="products-wrapper">
      <div className="products-sidebar">
        <h1>Filters</h1>
        <div className="separator"></div>
        <Filters onSend={changeFilters} filterType={"Applications"} query={FILTER_QUERY} />
        <Filters onSend={changePType} filterType={"Product Types"} query={PTYPE_QUERY} />
        <Filters onSend={changeShape} filterType={"Shapes"} query={SHAPE_QUERY} />
        <Filters onSend={changeStock} filterType={"Stock Types"} query={STOCK_QUERY} />
      </div>
      <div className="products-content">
        <h1>Products</h1>
        <ProductsList
          currentFilter={currentFilter}
          currentPType={currentPType}
          currentShape={currentShape}
          currentStock={currentStock}
          currentSearch={currentSearch}
          changeSearch={changeSearch}
        />
      </div>
    </div>
  )
}

export default ProductsPage;