import {
  Switch,
  Route
} from "react-router-dom";

import HomePage from "../homepage/HomePage";
import ProductsPage from "../productspage/ProductsPage";
import AboutPage from "../aboutpage/AboutPage";
import CatalogPage from "../catalogpage/CatalogPage"
import NewItemsPage from "../newitemspage/NewItemsPage";
import ContactPage from "../contactpage/ContactPage";

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
    <CatalogPage />
  </Route>
  <Route path="/new-items">
    <NewItemsPage />
  </Route>
  <Route path="/contact">
    <ContactPage />
  </Route>
</Switch>


export default SiteContent;