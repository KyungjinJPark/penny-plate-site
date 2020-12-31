import {
  Switch,
  Route
} from 'react-router-dom';

import HomePage from './components/HomePage'
import Products from './components/Products';

const Content = () =>
  <Switch>
    <Route exact path='/'>
      <HomePage />
    </Route>
    <Route path='/products'>
      <Products />
    </Route>
    <Route path='/about'>
      This is the ABOUT page
    </Route>
    <Route path='/catalog'>
      This is the CATALOG page
    </Route>
    <Route path='/new-items'>
      This is the NEW ITEMS page
  </Route>
  </Switch>;

export default Content;