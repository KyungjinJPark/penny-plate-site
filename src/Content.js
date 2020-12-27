import {
  Switch,
  Route
} from 'react-router-dom';

import Products from './components/Products'
import RecentNews from './components/RecentNews'

const Content = () => <main><Switch>
  <Route exact path='/'>
    This is the HOME page
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
  <Route path='/recent-news'>
    <RecentNews />
  </Route>
  <Route path='/new-items'>
    This is the NEW ITEMS page
  </Route>
</Switch></main>;

export default Content;