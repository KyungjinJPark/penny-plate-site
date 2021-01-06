import {
  Switch,
  Route
} from "react-router-dom";

import HomePage from "../homepage/HomePage";
import ProductsPage from "../productspage/ProductsPage";

const SiteContent = () => <Switch>
  <Route exact path="/">
    <HomePage />
  </Route>
  <Route path="/products">
    <ProductsPage />
  </Route>
  <Route path="/about">
    <p>This is the ABOUT page</p>
  </Route>
  <Route path="/catalog">
    <p>This is the CATALOG page</p>
  </Route>
  <Route path="/new-items">
    <p>This is the NEW ITEMS page</p>
  </Route>
</Switch>


export default SiteContent;