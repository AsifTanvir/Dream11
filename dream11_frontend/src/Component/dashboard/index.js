import React, { Component } from 'react';

import './css/playerListCard.css';
//import 'jquery';
import axios from "axios";
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            series:[],
            
        };

        this.loadSeries = this.loadSeries.bind(this);
     }

    componentWillMount(){
      this.loadSeries();
    }

  async loadSeries()
  {
    const promise = await axios.get("http://localhost:8000/dream11/api/MatchData/");
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data.data;
      console.log(data);
      this.setState({series:data});
    }
  }

  render(){

    let tagList = this.state.series.map(function(value,index)
    {
        return <div className="profile">
        <div className="content">
            <div className="text">
                <h6><span className="card__category">{value.home_team}  VS  {value.away_team}</span></h6>
            </div>
            <Link to={`/dream11/core/login/loggedIN/players/${value.home_team}/${value.away_team}/${value.Series_name}`}>
              
            <Button variant="contained" color="primary">
              Hello World
            </Button>

            </Link>
            
        </div>
        </div>
    }.bind(this));

    return(
      <div>
      <ul>
        <li><a class="active" href="#home">Home</a></li>
        <li><a href="#news">User</a></li>
        <li><a href="#contact">Upcoming Matches</a></li>
        <li><a href="#about">Points</a></li>
      </ul>
      <div className="asifbar">
        <div className="profilecontain">
          {tagList}
        </div>
      </div>
      </div>
    );
  }
}
export default  Dashboard;