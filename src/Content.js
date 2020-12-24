import {
  Switch,
  Route
} from 'react-router-dom';

import Products from './components/Products'

const Content = () => <main><Switch>
  <Route exact path='/'>Home</Route>
  <Route path='/products'><header>Products</header><Products /></Route>
  <Route path='/about'>About</Route>
  <Route path='/catalog'>Catalog</Route>
  <Route path='/recent-news'>Recent News</Route>
  <Route path='/new-items'>New Items</Route>
</Switch></main>;

export default Content;