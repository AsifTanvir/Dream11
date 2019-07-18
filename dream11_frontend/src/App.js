import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Link ,Switch } from "react-router-dom";

import Players from "./Component/Players/index";
import Profile from "./Component/Players/profile";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/dream11/core/login/loggedIN/"  exact component={Players} />
        <Route path="/dream11/core/login/loggedIN/:name/:country/"  component={Profile} />
      </BrowserRouter>
    );
  }
}

export default App;