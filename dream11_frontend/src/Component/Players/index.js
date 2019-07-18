import React, { Component } from "react";

import axios from "axios";
import './css/playerListCard.css';
import './css/search.css';
import './css/playerListCard.js';
import './css/search.js';

import { BrowserRouter, Route, Link } from "react-router-dom";
import Profile from "./profile";


export default class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players:[],
      search:'',
      role:'',
      playerAdded:false, ///add this
      addedPlayers:[],
      wicketkeeper: 0,
      batsman: 0,
      bowler: 0,
      allrounder: 0,
    };
    this.handleShow = this.handleShow.bind(this);
    this.SubmitteamHandler = this.SubmitteamHandler.bind(this);
    this.loadPlayers = this.loadPlayers.bind(this);
    this.loadTeamPlayers = this.loadTeamPlayers.bind(this);
    this.allrounderHandler = this.allrounderHandler.bind(this);
    this.batsmanHandler = this.batsmanHandler.bind(this);
    this.bowlerHandler = this.bowlerHandler.bind(this);
    this.wicketkeeperHandler = this.wicketkeeperHandler.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
  }

  /*componentDidMount() {
    fetch("http://localhost:8000/dream11/login/loggedIN/api")
      .then(res => res.json())
      .then(json => {
          this.setState({
            players : json,
          })
      });
  }*/
  componentWillMount(){
    this.loadPlayers();
    //this.loadTeamPlayers();
  }

  async loadPlayers()
  {
    const promise = await axios.get("http://localhost:8000/dream11/api/PlayerData/");
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data;
      console.log(data);
      this.setState({players:data});
    }
    console.log(this.state.players);
  }

  async loadTeamPlayers()
  {
    const promise = await axios.get("http://localhost:8000/dream11/api/TeamPlayersData/");
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data.data;
      this.setState({addedPlayers:data});
    }
  }

  updateSearch(event){
    this.setState({
      search: event.target.value})
      //console.log(this.state.search);
  }


  batsmanHandler(){
    this.setState({
      role: "batsman"})
  }

  bowlerHandler(){
    this.setState({
      role: "bowler"})
  }

  allrounderHandler(){
    this.setState({
      role: "allrounder"})
  }

  wicketkeeperHandler(){
    this.setState({
      role: "wicketkeeper"})
  }
  handleShow(name,role,country,image){
    //console.log("value" + name +role +country+image);
    let arr = this.state.addedPlayers.slice();
    let playerClicked = this.state.players.filter( (player) => {
            return player.name.toLowerCase().indexOf(name.toString().toLowerCase()) !== -1 && player.role.toLowerCase().indexOf(role.toString().toLowerCase()) !== -1
        && player.country.toLowerCase().indexOf(country.toString().toLowerCase()) !== -1 && player.image.toLowerCase().indexOf(image.toString().toLowerCase()) !== -1;
        }

    )
      console.log(playerClicked);
    let flag = 0;
    let i;
    let taskList;
    for(i=0; i< arr.length ;i++){

        if(name.toString().toLowerCase().indexOf(arr[i].name.toLowerCase()) !== -1 && role.toString().toLowerCase().indexOf(arr[i].role.toLowerCase()) !== -1
        && country.toString().toLowerCase().indexOf(arr[i].country.toLowerCase()) !== -1 && image.toString().toLowerCase().indexOf(arr[i].image.toLowerCase()) !== -1){
            flag = 1;
            break;
        }
    }
    let wkt = this.state.wicketkeeper;
    let bats = this.state.batsman;
    let bowl = this.state.bowler;
    let allr = this.state.allrounder;
    if(flag === 0 && role.toLowerCase().indexOf("wicketkeeper") !== -1)
        wkt = wkt+1;
    else if(flag === 0 && role.toLowerCase().indexOf("batsman") !== -1)
        bats = bats+1;
    else if(flag === 0 && role.toLowerCase().indexOf("bowler") !== -1)
        bowl = bowl+1;
    else if(flag === 0 && role.toLowerCase().indexOf("allrounder") !== -1)
        allr = allr+1;
    console.log(wkt);
    console.log(bats);
    console.log(bowl);
    console.log(allr);

    if(flag === 0 && this.state.addedPlayers.length < 11 && wkt < 3 && bats < 5 && bowl < 5 && allr < 3 ){
        console.log("ffffffff")
        var person = {name:name, role:role, country:country, image:image};
        arr.push(person);
        taskList = this.state.players.filter((player) => {
            return player.name !== name;
        })

        this.setState({
            addedPlayers : arr,
            players : taskList,
            playerAdded : !this.state.playerAdded,
            allrounder: allr,
            wicketkeeper: wkt,
            batsman:bats,
            bowler:bowl
        });
    }
    //console.log("arr" + arr);

    //console.log("addedlist"+this.state.addedPlayers);
  }

  async SubmitteamHandler(){
      /*var data ='{ ';
      this.state.addedPlayers.map(function (value) {
          data += '{ "name":"'+value.name+'","role":"'+value.role+'","country":"'+value.country+'","image":"'+value.image+'" },'
      })
      data+=' }'*/
      var headers = {
        'content_type':'application/json',
      }
      //var datai=[];
      this.state.addedPlayers.map(async function (value){
            //datai = value;
            const response = await axios.post("http://localhost:8000/dream11/api/PlayerData/",value,headers);
            if(response.status === 200){
                console.log("inserted successfully");
            }
      })

  }

  removePlayer(index){
    if(window.confirm("Are you sure you want to remove this player?")){
        let taskList = this.state.addedPlayers.filter((player) => {
            return player.name !== index;
        })
        let taskList1 = this.state.addedPlayers.filter((player) => {
            return player.name === index;
        })
        let arr = [...this.state.players];

        arr.push(taskList1[0]);
        this.setState({
            addedPlayers : taskList,
            players : arr
        })
    }
  }

  render() {


    //console.log(this.state.role);
    let searchPlayer;
    if( this.state.role.indexOf("batsman") !== -1){
        searchPlayer = this.state.players.filter(
            (player) => {
                return player.role.toLowerCase().indexOf("batsman") !== -1 &&
                    player.name.toLowerCase().indexOf(this.state.search) !== -1;
                });


    }
    else if( this.state.role.indexOf("bowler")!== -1){
        searchPlayer = this.state.players.filter(
            (player) => {
                return player.role.toLowerCase().indexOf("bowler") !== -1 &&
                    player.name.toLowerCase().indexOf(this.state.search) !== -1;
                });
    }
    else if( this.state.role.indexOf("allrounder") !== -1){
        searchPlayer = this.state.players.filter(
            (player) => {
                return player.role.toLowerCase().indexOf("allrounder") !== -1 &&
                    player.name.toLowerCase().indexOf(this.state.search) !== -1;
                });
    }
    else if(this.state.role.indexOf("wicketkeeper") !== -1){
        searchPlayer = this.state.players.filter(
            (player) => {
                return player.role.toLowerCase().indexOf("wicketkeeper") !== -1 &&
                    player.name.toLowerCase().indexOf(this.state.search) !== -1;
                });
    }
    else {
        searchPlayer = this.state.players.filter(
        (player) => {
            return player.name.toLowerCase().indexOf(this.state.search) !== -1;
        }
    );
    }
    let tagList = searchPlayer.map(function(value,index)
    {
        return <div className="profile">
        <div className="photo"><img src={value.image} /></div>
        <div className="content">
            <div className="text">
                <Link to={`/dream11/core/login/loggedIN/${value.name}/${value.country}/`} >{value.name}</Link>
                <h6><span className="card__category">{value.country}</span></h6>
            </div>
            <div className="btn" onClick={() => this.handleShow(value.name,value.role,value.country,value.image)}>
            <span>

            </span>
            </div>
        </div>
    </div>
    }.bind(this));
    let addedBatsman;
    let addedBowler;
    let addedWkt;
    let addedAllrounder;
    //console.log(this.state.addedPlayers);
    if (this.state.addedPlayers !== null) {
        addedBatsman = this.state.addedPlayers.filter(
            (player) => {
                return player.role.toLowerCase().indexOf('batsman') !== -1;
            }
        )
    }
    if (this.state.addedPlayers !== null) {
        addedBowler = this.state.addedPlayers.filter(
            (player) => {
                return player.role.toLowerCase().indexOf('bowler') !== -1;
            }
        )
    }
    if (this.state.addedPlayers !== null) {
        addedWkt = this.state.addedPlayers.filter(
            (player) => {
                return player.role.toLowerCase().indexOf('wicketkeeper') !== -1;
            }
        )
    }
    if (this.state.addedPlayers !== null) {
        addedAllrounder = this.state.addedPlayers.filter(
            (player) => {
                return player.role.toLowerCase().indexOf('allrounder') !== -1;
            }
        )
    }

    let wicketkeeperGeseGa =addedWkt.map(function (value,index)
    {
        return  <div class="column">

            <div className="cards">
                <div className="btnRmv" onClick={()=> this.removePlayer(value.name)}><span>&times;</span>  </div>
                <Link to={`/dream11/core/login/loggedIN/${value.name}/${value.country}/`} >
                    <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                </Link>
            </div>

        </div>
    }.bind(this));

    let batsmanGeseGa =addedBatsman.map(function (value,index)
    {
        return  <div class="column">

            <div className="cards">

                <div className="btnRmv" onClick={()=> this.removePlayer(value.name)}><span>&times;</span>  </div>
                <Link to={`/dream11/core/login/loggedIN/${value.name}/${value.country}/`} >
                    <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                </Link>
            </div>

        </div>
    }.bind(this));

    let allrounderGeseGa =addedAllrounder.map(function (value,index)
    {
        return  <div class="column">

            <div className="cards">

                <div className="btnRmv" onClick={()=> this.removePlayer(value.name)}><span>&times;</span>  </div>
                <Link to={`/dream11/core/login/loggedIN/${value.name}/${value.country}/`} >
                    <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                </Link>
            </div>

        </div>
    }.bind(this));

    let bowlerGeseGa =addedBowler.map(function (value,index)
    {
        return  <div class="column">

            <div className="cards">
                <div className="btnRmv" onClick={()=> this.removePlayer(value.name)}><span>&times;</span>  </div>
                <Link to={`/dream11/core/login/loggedIN/${value.name}/${value.country}/`} >
                    <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                </Link>

            </div>

        </div>
    }.bind(this));

    //console.log(searchPlayer);

    return(


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
                <button type="button" className="btn button5" onClick={this.SubmitteamHandler}>Submit Team</button>
            </div>

        </div>


      <div className="s130">
        <form>
            <div className="inner-form">
                <div className="input-field first-wrap">
                    <div className="svg-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                        </svg>
                    </div>
                    <input id="search" name="keyword" type="text" placeholder="Which player are you looking for?" onChange={this.updateSearch.bind(this)}/>
                </div>
            </div>
            </form>
      </div>
        <div className="container-fluid butt">
            <div className="btn-group btn-group-justified buttons">
                <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                        <button type="button" className="btn button1" onClick={this.wicketkeeperHandler}>Wicketkeeper</button>
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn  button1" onClick={this.batsmanHandler}>Batsman</button>
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn  button1" onClick={this.allrounderHandler}>All rounder</button>
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn  button1" onClick={this.bowlerHandler}>Bowler</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            {tagList}
        </div>

    </div>

    )
  }
}