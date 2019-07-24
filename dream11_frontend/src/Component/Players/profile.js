import React, { Component } from 'react';
import {Route} from "./index";
//import 'jquery';
import axios from "axios";
import  './css/profile.css';
//import './css/table/images/icons/favicon.ico';
//import './css/table/vendor/bootstrap/css/bootstrap.min.css';
//import './css/table/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
//import './css/table/vendor/animate/animate.css';
//import './css/table/vendor/select2/select2.min.css';
//import './css/table/vendor/perfect-scrollbar/perfect-scrollbar.css';
//import './css/table/css/util.css';
//import './css/table/css/main.css';
//import './css/table/css/jquery-3.4.1.min.js';
//import './css/profile/js/bootstrap.min.js';
//import './css/profile/css/profile.css';
//import './css/profile/css/bootstrap.min.css';
//import './css/table/js/main.js';
//import  './css/table/vendor/select2/select2.min.js';
//import './css/table/vendor/bootstrap/js/bootstrap.min.js';
//import './css/table/vendor/bootstrap/js/popper.js';
//import './css/table/vendor/jquery/jquery-3.2.1.min.js';
class Profile extends Component {
     constructor(props){
        super(props);
        this.state = {
            players:[],
            playerPoints:[],
        };

        this.loadPlayers = this.loadPlayers.bind(this);
        this.loadPoints = this.loadPoints.bind(this);
     }

     componentWillMount(){
    this.loadPlayers();
    this.loadPoints();
    }

  async loadPlayers()
  {
    const promise = await axios.get("http://localhost:8000/dream11/api/PlayerData/");
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data;
        this.setState({players:data});
    }
  }

  async loadPoints()
  {
    const promise = await axios.get("http://localhost:8000/dream11/api/PlayerPointsData/");
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data;
        this.setState({playerPoints:data});
        console.log(this.state.playerPoints);
    }
  }

    render() {
         console.log(this.props.match.params.name.toLowerCase());
         let playerI = this.state.players.filter(
              (player) => {
                  return player.name.toLowerCase().indexOf(this.props.match.params.name.toLowerCase()) !== -1 ;
                  });

        let points = this.state.playerPoints.filter(
            (pl) => {
                return pl.id === this.props.match.params.id ;
            });
        console.log(points);
        console.log(playerI);
      return (
          <div>
              {
                  playerI.map(function (value) {
                      return <div className="container-fluid ">

                          <div className="card pro_file" style={{width: '300px'}}>
                              <div>
                                <img class="playerImage" src={value.image} alt="Player Image"></img>
                              </div>
                              <div className="card-body">
                                  <h4 className="card-title">{value.name}</h4>
                                  <p className="card-text"> {value.country}</p>
                              </div>
                          </div>
                      </div>
                  })
              }
                  <div className="container-fluid">
                      <h2>History</h2>

                      <table className="table table-hover">
                          <thead>
                          <tr>
                              <th>Week</th>
                              <th>Points</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                              <td>1</td>
                              <td>{points.total_points}</td>
                          </tr>
                          <tr>
                              <td>2</td>
                              <td>30</td>
                          </tr>
                          <tr>
                              <td>3</td>
                              <td>48</td>
                          </tr>
                          </tbody>
                      </table>
                  </div>
          </div>
      );
    }
  }
export default  Profile;