import {
  BrowserRouter as Router,
  NavLink
} from 'react-router-dom';

import './App.css';
import Content from './Content';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Content />
      <Footer />
    </Router>
  );
}

const NavBar = () => <nav>
  <ul>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/products'>Products</NavLink></li>
    <li><NavLink to='/about'>About</NavLink></li>
    <li><NavLink to='/catalog'>Catalog</NavLink></li>
    <li><NavLink to='/recent-news'>Recent News</NavLink></li>
    <li><NavLink to='/new-items'>New Items</NavLink></li>
  </ul>
</nav>;

const Footer = () => <footer>
  <p>© 2018 Gandalf</p>
</footer>;

export default App;
