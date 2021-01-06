import {
  BrowserRouter as Router,
  // NavLink
} from "react-router-dom";

import "./App.css";
import "./components/coresite/coresite.css";
import SiteNavbar from "./components/coresite/SiteNavbar";
import SiteContent from "./components/coresite/SiteContent";
import SiteFooter from "./components/coresite/SiteFooter";

const App = () => <Router>
  <SiteNavbar />
  <SiteContent />
  <SiteFooter />
</Router>

export default App;