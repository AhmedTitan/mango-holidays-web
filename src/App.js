import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "antd/dist/antd.css";
import "./App.css";

import Routes from "./Routes.js";
const browserHistory = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
