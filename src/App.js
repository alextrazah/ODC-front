import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import dash from "./components/Dash";
import usedash from "./components/Usedash";
import Exel from "./components/Exel";

function App() {
  const history = useHistory();

  const Logout = () => {
    localStorage.clear();
  };
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  if (username === null) {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>
                RemoteStack
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Sign in
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="outer">
            <div className="inner">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/sign-in" component={Login} />
                <Route path="/dash" component={dash} />
                <Route path="/usedash" component={usedash} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/Exel" component={Exel} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>
                RemoteStack
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link">welcome {username}</Link>
                  </li>

                  <li
                    onClick={() => {
                      Logout();
                    }}
                    className="nav-item"
                  >
                    <Link className="nav-link" to={"/sign-in"}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container">
            <div className="container">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/sign-in" component={Login} />
                <Route path="/dash" component={dash} />
                <Route path="/usedash" component={usedash} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/Exel" component={Exel} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
