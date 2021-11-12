import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Navi from "./layouts/Navi";
import Dashboard from "./layouts/Dashboard";
import { Container } from "semantic-ui-react";
import Cookies from "js-cookie";

function App() {
  return (
    <div className="App">
      <Navi />
      <div className="main">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
