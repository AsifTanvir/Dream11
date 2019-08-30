import React, { Component } from 'react';
import {Route} from "./index";
//import 'jquery';
import axios from "axios";
import  './css/profile.css';
import Paper from '@material-ui/core/Paper';
import MaterialTable from "material-table";

class Profile extends Component {
     constructor(props){
        super(props);
        this.state = {
            players:[],
            columns: [
                { title: "Opponent", field: "awayTeam"},
                { title: "Date", field: "date"},
                { title: "Points", field: "total_points"}
              ],
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
    let playerName = this.props.match.params.name;
    var headers = {
        'content_type':'application/json',
    }
    
    //var datai=[];
    var ser = {name: playerName};
    const response = await axios.post("http://localhost:8000/dream11/api/playerHistory/",ser,headers);
            if(response.status === 200){
                console.log("inserted successfully");
                console.log(response.data.data);
                let responsedata = response.data.data;
                this.setState({
                    playerPoints:responsedata
                })
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
                    <Paper>
                        <MaterialTable
                            title="Player Stats"
                            columns={this.state.columns}
                            data={this.state.playerPoints}
                            options={{
                                search: false,
                                paging: false
                            }}
                            
                        />
                  </Paper>
                  </div>
          </div>
      );
    }
  }
export default  Profile;