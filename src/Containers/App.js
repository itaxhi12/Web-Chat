/** @format */

import "./App.css";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Messenger from "../Pages/Messenger/Messenger";
function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/messenger" /> : <Login />}
        </Route>
        <Route exact path="/register">
          {user ? <Redirect to="/messenger" /> : <Register />}
        </Route>
        <Route exact path="/messenger">
          {user ? <Messenger /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
