import "./App.css";
import Home from "./components/Home";
import Mpicker from "./components/Mpicker";
import { Router, Route, browserHistory } from "react-router";
function App() {
  console.log("App");
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/sso/microsoft" component={Mpicker} />
    </Router>
  );
}

export default App;
