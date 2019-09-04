import React, { Component } from 'react'
import LeaderBoard from './LeaderBoard';
import NavDrawer from './NavDrawer';
import FantasyStats from './FantasyStats';
import {Dashboard as D} from '../dashboard/index';
import Profile from "../Players/profile";
import Players from '../Players/index';
import MyTeam from "../Players/team";
import { BrowserRouter, Route, Link ,Switch } from "react-router-dom";
import Contest from './league/Contests';
import Leagues from './league/Leagues';
import LeagueInfo from './league/LeagueInfo';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

class DashBoard extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
      }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <NavDrawer {...this.props}>
                        <Route exact path="/dashboard/"  exact component={D} />
                        <Route path="/dashboard/players/:Home_team/:Away_team/:id"  component={Players} />
                        <Route path="/dashboard/MyTeam/:home/:away/:series/:id/:userName"  component={MyTeam} />
                        <Route path="/dashboard/profile/:name/:country/" component={Profile} />
                        <Route path="/dashboard/leaderboard/" component={LeaderBoard} />
                        <Route path="/dashboard/fantasystats/" component={FantasyStats} />
                        <Route path="/dashboard/contests/" component={Contest} />
                        <Route path="/dashboard/MyLeagues/:userName/" component={Leagues} />
                        <Route path="/dashboard/league_list/:league_name/" component={LeagueInfo} />
                    </NavDrawer>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null,
      username: state.user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

