import {
  Switch,
  Route
} from 'react-router-dom';

const Content = () => <Switch>
  <Route exact path='/'>Home</Route>
  <Route path='/products'>Products</Route>
  <Route path='/about'>About</Route>
  <Route path='/catalog'>Catalog</Route>
  <Route path='/recent-news'>Recent News</Route>
  <Route path='/new-items'>New Items</Route>
</Switch>
  // <main>
  //   <header>
  //     <h1>Cute Puppies Express!</h1>
  //   </header>
  //   <p>Geckos are a group of usually small, usually nocturnal lizards. They are found on every continent except Australia.</p>

  //   <p>Many species of gecko have adhesive pathe pads which enable them path climb walls and even windows.</p>
  // </main>
  ;

export default Content;