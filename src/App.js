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
    history.push("/sign-in");
  };
  console.log(localStorage.length);
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  if (role != null) {
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
                {localStorage.length !== 0 && (
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link">Welcome {username} </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        onClick={() => {
                          Logout();
                        }}
                        to={"/sign-in"}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
                {localStorage.length === 0 && (
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
                )}
              </div>
            </div>
          </nav>
          <Switch>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </Switch>
          <div className="autre">
            <Switch>
              <Route path="/dash" component={dash} />
              <Route path="/usedash" component={usedash} />
            </Switch>

            <div className="inner">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/sign-in" component={Login} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/Exel" component={Exel} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  } else
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
                <Route path="/sign-up" component={SignUp} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
}

export default App;
