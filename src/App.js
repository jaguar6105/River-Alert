import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/pages/Home";
import River from "./components/pages/River";

import './App.css';

function App() {
  return (
  <Router>
      <div>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/river/:id" component={River} />
      </div>
    </Router>
  );
}

export default App;
//  <Route exact path="/" component={Home} />
//<Route exact path="/:id" component={River} />
      