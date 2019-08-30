import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Link ,Switch } from "react-router-dom";

import Players from "./Component/Players/index";
import Profile from "./Component/Players/profile";
import MyTeam from "./Component/Players/team";
// import Dashboard from "./Component/dashboard/Dashboard";
// import Dashboard from "./Component/dashboard/index";
import Dashboard from "./Component/nion_ui/DashBoard";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/dream11/core/login/loggedIN/"  exact component={Dashboard} />
        <Route path="/dream11/core/login/loggedIN/players/:Home_team/:Away_team/:Series_name"  component={Players} />
        <Route path="/dream11/core/login/loggedIN/profile/:name/:country/"  component={Profile} />
        <Route path="/dream11/core/login/loggedIN/MyTeam/:home/:away/:series/"  component={MyTeam} />
      </BrowserRouter>
    );
  }
}

export default App;