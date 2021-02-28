import {BrowserRouter as Router, Route} from "react-router-dom";
import "./css/main.scss";

import Navbar from "./components/navbar.jsx";
import Main from "./components/main.jsx";
import About from "./components/about.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <section className = "main-content">
          <Route exact path = "/" component={Main}/>
          <Route exact path = "/about" component = {About}/>
        </section>
      </Router>
    </div>
  );
}

export default App;
