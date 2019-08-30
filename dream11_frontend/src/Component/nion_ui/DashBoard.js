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

class DashBoard extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <NavDrawer>
                        <Route exact path="/dream11/core/login/loggedIN/"  exact component={D} />
                        <Route path="/dream11/core/login/loggedIN/players/:Home_team/:Away_team/:Series_name"  component={Players} />
                        <Route path="/dream11/core/login/loggedIN/MyTeam/:home/:away/:series/"  component={MyTeam} />
                        <Route path="/dream11/core/login/loggedIN/profile/:name/:country/" component={Profile} />
                        <Route path="/dream11/core/login/loggedIN/leaderboard/" component={LeaderBoard} />
                        <Route path="/dream11/core/login/loggedIN/fantasystats/" component={FantasyStats} />
                        <Route path="/dream11/core/login/loggedIN/contests/" component={Contest} />
                        <Route path="/dream11/core/login/loggedIN/MyLeagues/:userID/:userName/" component={Leagues} />
                        <Route path="/dream11/core/login/loggedIN/league_list/:league_name/" component={LeagueInfo} />
                    </NavDrawer>
                </BrowserRouter>
            </div>
        )
    }
}

export default DashBoard

