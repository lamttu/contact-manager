import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Contacts from "./components/contacts/Contacts";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import AddContact from "./components/contacts/AddContact";
import EditContact from "./components/contacts/EditContact";
import Spinner from "./components/layout/spinner/Spinner";
import { Provider, Consumer } from "./context";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Consumer>
                {value => {
                  return value.loading && <Spinner />;
                }}
              </Consumer>
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
