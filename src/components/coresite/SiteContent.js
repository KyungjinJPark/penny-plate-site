import { Switch, Route } from "react-router-dom";

import HomePage from "../homepage/HomePage";
import ProductsPage from "../productspage/ProductsPage";
import AboutPage from "../aboutpage/AboutPage";
import CatalogPage from "../catalogpage/CatalogPage"
import NewItemsPage from "../newitemspage/NewItemsPage";
import ContactPage from "../contactpage/ContactPage";

const SiteContent = () => <Switch>
  <Route exact path="/" component={HomePage} />
  <Route path="/products" component={ProductsPage} />
  <Route path="/about" component={AboutPage} />
  <Route path="/catalog" component={CatalogPage} />
  <Route path="/new-items" component={NewItemsPage} />
  <Route path="/contact" component={ContactPage} />
</Switch>


export default SiteContent;