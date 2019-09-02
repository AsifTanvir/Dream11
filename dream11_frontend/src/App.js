import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Link ,Switch } from "react-router-dom";

// import Players from "./Component/Players/index";
// import Profile from "./Component/Players/profile";
// import MyTeam from "./Component/Players/team";
// import Dashboard from "./Component/dashboard/Dashboard";
// import Dashboard from "./Component/dashboard/index";
import Dashboard from "./Component/nion_ui/DashBoard";
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import SignUp from './Component/nion_ui/AuthLayout/SignUp';
import SignIn from './Component/nion_ui/AuthLayout/SignIn';
import MainContainer from './Component/nion_ui/MainContainer';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <BrowserRouter>
        <MainContainer>
          <Route path="/login/"  exact render={() => (<SignIn {...this.props} />)} />
          <Route path="/dashboard/" render={() => (<Dashboard {...this.props} />)} />
          <Route path="/signup/" exact render={() => (<SignUp {...this.props} />)} />
          {/* <Route path="/dream11/core/login/loggedIN/players/:Home_team/:Away_team/:Series_name"  component={Players} />
          <Route path="/dream11/core/login/loggedIN/profile/:name/:country/"  component={Profile} />
          <Route path="/dream11/core/login/loggedIN/MyTeam/:home/:away/:series/"  component={MyTeam} /> */}
        </MainContainer>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


// export default App;