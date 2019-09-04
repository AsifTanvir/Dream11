import React, { Component } from 'react';
import {Route} from "./index";
import {Link} from "react-router-dom";

import axios from "axios";
import './css/playerListCard.css';
import './css/search.css';
import './css/playerListCard.js';
import './css/search.js';

class MyTeam extends Component {
     constructor(props){
        super(props);
        this.state = {
            players:[],
            addedPlayers:[],
            
        };

        this.loadPlayers = this.loadPlayers.bind(this);
        this.loadTeamPlayers = this.loadTeamPlayers.bind(this);
     }

    componentDidMount(){
        this.loadPlayers();
        this.loadTeamPlayers();
    }

    async loadPlayers()
    {
        const promise = await axios.get("http://localhost:8000/dream11/api/PlayerData/");

        const status = promise.status;
        if(status===200)
        {
        const data = promise.data;
        console.log(data);
        this.setState({
            players:data
            });
        }
    }

    async loadTeamPlayers()
    {
        var ser = {Match_id: this.props.match.params.id,User_Name:this.props.match.params.userName};
        var headers = {
            'content_type':'application/json',
        }
        console.log(ser);
        const response = await axios.post("http://localhost:8000/dream11/api/TeamPlayersData/",ser,headers);
        
        if(response.status===200)
        {
            const data = response.data.data;
            console.log(data);
            
            //bal = this.state.availableBalance - bal;
            this.setState({
                addedPlayers:data
            });
            
        }
        return response.status;
    }


    render() {
        let Home_team = this.props.match.params.home;
        let Away_team = this.props.match.params.away;
        let Series_name = this.props.match.params.series;
        let myPlayers=[];  
        this.state.addedPlayers.forEach((obj, i) => {
            this.state.players.forEach((obj2, i2) => {
                
                if(obj.name === obj2.name){
                    myPlayers.push(obj2);
                }
            })
        })
        
        //let myPlayers = this.state.players.filter(f => !this.state.addedPlayers.Players_id !== f.id);
        console.log(myPlayers);
        let addedBatsman;
        let addedBowler;
        let addedWkt;
        let addedAllrounder;
        //console.log(this.state.addedPlayers);
        if (myPlayers !== null) {
            addedBatsman = myPlayers.filter(
                (player) => {
                    return player.role.toLowerCase().indexOf('batsman') !== -1;
                }
            )
        }
        if (myPlayers !== null) {
            addedBowler = myPlayers.filter(
                (player) => {
                    return player.role.toLowerCase().indexOf('bowler') !== -1;
                }
            )
        }
        if (myPlayers !== null) {
            addedWkt = myPlayers.filter(
                (player) => {
                    return player.role.toLowerCase().indexOf('wicketkeeper') !== -1;
                }
            )
        }
        if (myPlayers !== null) {
            addedAllrounder = myPlayers.filter(
                (player) => {
                    return player.role.toLowerCase().indexOf('allrounder') !== -1;
                }
            )
        }
    
        let wicketkeeperGeseGa =addedWkt.map(function (value,index)
        {
            return  <div class="column">
    
                <div className="cards">
                    <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                </div>
    
            </div>
        }.bind(this));
    
        let batsmanGeseGa =addedBatsman.map(function (value,index)
        {
            return  <div class="column">
    
                <div className="cards">
                    <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                </div>
    
            </div>
        }.bind(this));
    
        let allrounderGeseGa =addedAllrounder.map(function (value,index)
        {
            return  <div class="column">
    
                <div className="cards">
                    <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                </div>
    
            </div>
        }.bind(this));
    
        let bowlerGeseGa =addedBowler.map(function (value,index)
        {
            return  <div class="column">
    
                <div className="cards">
                    <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                </div>
    
            </div>
        }.bind(this));
    
      return (
        <div>
        <div className="total_team">
        <div className="container team">
            <div className="coloredDiv">
            <h3 > <span className="label label-success create_team card__category">Wicketkeeper</span></h3>
            </div>
            <div className="team_space rows">
                { wicketkeeperGeseGa}
            </div>
        </div>
        <div className="container team">
            <div className="coloredDiv">
                <h3> <span className="label label-success create_team card__category">Batsman</span></h3>
            </div>

            <div className="team_space rows">
                { batsmanGeseGa }
            </div>

        </div>
        <div className="container team">
            <div className="coloredDiv">
                <h3> <span className="label label-success create_team card__category">All rounder</span></h3>
            </div>

            <div className="team_space rows">
                {allrounderGeseGa}
            </div>
        </div>
        <div className="container team">
            <div className="coloredDiv">
                <h3> <span className="label label-success create_team card__category">Bowler</span></h3>
            </div>

            <div className="team_space rows">
                {bowlerGeseGa}
            </div>
        </div>
        </div>
        <div className="container-fluid">
            <div className="buttfix">
                <Link to={`/dashboard/players/${Home_team}/${Away_team}/${ this.props.match.params.id}/`} >
                    <button type="button" className="btn button5" >Modify Team</button>
                </Link>
            </div>

        </div> 
        </div>
      );
    }
  }
export default  MyTeam;