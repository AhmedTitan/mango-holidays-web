import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import "antd/dist/antd.css";
import "./App.css";

import Routes from "./Routes.js";
const browserHistory = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <BrowserRouter history={browserHistory}>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
