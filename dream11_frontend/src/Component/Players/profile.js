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

    };

        this.loadPlayers = this.loadPlayers.bind(this);
     }

     componentWillMount(){
    this.loadPlayers();
  }

  async loadPlayers()
  {
    const promise = await axios.get("http://localhost:8000/dream11/api/PlayerData/");
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data.data;
        this.setState({players:data});
    }
  }

    render() {
         console.log(this.state.players);
         let player = this.state.players.filter(
              (player) => {
                  return player.name.toLowerCase().indexOf(this.props.match.params.name.toLowerCase()) !== -1 ;

                  });
         console.log(player);
      return (
          <div>
              <div className="container-fluid">

                  <div className="card pro_file" style={{ width:'400px'}}>

                          <div className="card-body">
                              <h4>Hello</h4>
                              <h4 className="card-title">{player.name}</h4>
                              <p className="card-text">{player.role}</p>
                                <p className="card-text"> {player.country}</p>
                          </div>
                  </div>
              </div>

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
                          <td>45</td>
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