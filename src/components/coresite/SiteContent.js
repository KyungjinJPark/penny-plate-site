import {
  Switch,
  Route
} from "react-router-dom";

import HomePage from "../homepage/HomePage";
import ProductsPage from "../productspage/ProductsPage";
import AboutPage from "../aboutpage/AboutPage";
import NewItemsPage from "../newitemspage/NewItemsPage";

const SiteContent = () => <Switch>
  <Route exact path="/">
    <HomePage />
  </Route>
  <Route path="/products">
    <ProductsPage />
  </Route>
  <Route path="/about">
    <AboutPage />
  </Route>
  <Route path="/catalog">
    <p>This is the CATALOG page</p>
  </Route>
  <Route path="/new-items">
    <NewItemsPage />
  </Route>
  <Route path="/contact">
    <p>This is the CONTACT page</p>
  </Route>
</Switch>


export default SiteContent;