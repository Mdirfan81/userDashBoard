import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import Login from "./views/pages/Login";
// import SignUp from "./views/pages/SignUp";
// import Users from "./views/pages/Users";
import RowCol from "./views/pages/RowCol";

function App() {
  return (
    // <Route exact path="/signup" component={SignUp} />
    <React.Fragment>
      <Router>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/user" component={RowCol} />
          </Switch>
        </Provider>
      </Router>
    </React.Fragment>
  );
}

export default App;
