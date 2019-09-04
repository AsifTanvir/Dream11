import React, { Component } from "react";

import axios from "axios";
import './css/playerListCard.css';
import './css/search.css';
import './css/playerListCard.js';
import './css/search.js';

import { BrowserRouter, Route, Link } from "react-router-dom";
import Profile from "./profile";
import { connect } from 'react-redux';


export class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players:[],
      search:'',
      role:'',
      myTeam:[],
      addedPlayers:[],
      wicketkeeper: 0,
      batsman: 0,
      bowler: 0,
      allrounder: 0,
      searchPlayer1:[],
      availableBalance:100,
      loading:true,
      removedPlayers:[],
    };
    this.handleShow = this.handleShow.bind(this);
    this.SubmitteamHandler = this.SubmitteamHandler.bind(this);
    this.loadPlayers = this.loadPlayers.bind(this);
    this.loadTeamPlayers = this.loadTeamPlayers.bind(this);
    this.CurrentTeamPlayers = this.CurrentTeamPlayers.bind(this);
    this.allrounderHandler = this.allrounderHandler.bind(this);
    this.batsmanHandler = this.batsmanHandler.bind(this);
    this.bowlerHandler = this.bowlerHandler.bind(this);
    this.wicketkeeperHandler = this.wicketkeeperHandler.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.seriesPlayers = this.seriesPlayers.bind(this);
  }

  componentWillMount(){
    console.log("hi");
    this.loadTeamPlayers();
    this.loadPlayers();
    
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
    var ser = {Match_id: this.props.match.params.id,User_Name:this.props.username};
    var headers = {
        'content_type':'application/json',
    }
    console.log(this.props.match.params.id,this.props.username);
    const response = await axios.post("http://localhost:8000/dream11/api/TeamPlayersData/",ser,headers);
    
    if(response.status===200)
    {
        const data = response.data.data;
        console.log(data);
        
        //bal = this.state.availableBalance - bal;
        this.setState({
            myTeam:data
        });
        
    }
    this.CurrentTeamPlayers();
  }

  CurrentTeamPlayers(){
    let myPlayers=[];  
    console.log(this.state.myTeam)
    this.state.myTeam.forEach((obj, i) => {
        //console.log("hi");
        this.state.players.forEach((obj2, i2) => { 
            //console.log(obj.Players,obj2.id);
            if(obj.name === obj2.name){
                myPlayers.push(obj2);
            }
        })
    });
    console.log("hoga");
    console.log(myPlayers);
    var total = myPlayers.reduce(function (accumulator, pilot) {
        return accumulator + pilot.credit;
      }, 0);

    let balance = 100-total;

    this.setState({
        addedPlayers:myPlayers,
        availableBalance:balance
    });
    console.log(this.state.addedPlayers);
  }

  updateSearch(event){
    this.setState({
      search: event.target.value})
      //console.log(this.state.search);
  }

  seriesPlayers(teamA,teamB){
    let teamPlayers = this.state.players.filter((player) => {
        return player.country === teamA || player.country === teamB;
    })
    console.log(teamPlayers);
    this.setState({players : teamPlayers});
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
  handleShow(name,role,country,image,credit){
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
    

    let balance = this.state.availableBalance;
    balance = balance - credit;

    if(flag === 0 && this.state.addedPlayers.length < 11 && wkt < 3 && bats < 5 && bowl < 5 && allr < 3 && balance>0){
        console.log("ffffffff")
        var person = {name:name, role:role, country:country, image:image , credit:credit};
        arr.push(person);

        this.setState({
            addedPlayers : arr,
            allrounder: allr,
            wicketkeeper: wkt,
            batsman:bats,
            bowler:bowl,
            availableBalance:balance,
        });

    }
  }

  async SubmitteamHandler(){
      /*var data ='{ ';
      this.state.addedPlayers.map(function (value) {
          data += '{ "name":"'+value.name+'","role":"'+value.role+'","country":"'+value.country+'","image":"'+value.image+'" },'
      })
      data+=' }'*/

        let wkt = 0;
        let bats = 0;
        let bowl = 0;
        let allr = 0;
        let Home_teamP = 0;
        let away_teamp = 0;
        let homeTeam = this.props.match.params.Home_team;
        let awayTeam = this.props.match.params.Away_team;

        this.state.addedPlayers.map( function (value){ 
            if( value.role.toLowerCase().indexOf("wicketkeeper") !== -1)
                wkt = wkt+1;
            else if(value.role.toLowerCase().indexOf("batsman") !== -1)
                bats = bats+1;
            else if(value.role.toLowerCase().indexOf("bowler") !== -1)
                bowl = bowl+1;
            else if( value.role.toLowerCase().indexOf("allrounder") !== -1)
                allr = allr+1;
        })

        this.state.addedPlayers.map( function (value){ 
            if( value.country.toLowerCase().indexOf(homeTeam) !== -1)
                Home_teamP = Home_teamP + 1;
            else if(value.country.toLowerCase().indexOf(awayTeam) !== -1)
                away_teamp = away_teamp + 1;
        })
        
        let balance = this.state.availableBalance;
        console.log(wkt,bats,bowl,allr,balance,this.state.addedPlayers.length)
      if(this.state.addedPlayers.length == 11 && wkt >=1 && bats >=3 && bowl >=3 && allr >= 1 && balance>=0 ){
        if(window.confirm("Are you sure you want to confirm this changes?")){
        
            var ser = {Match_id: this.props.match.params.id,User_Name:this.props.username};
            console.log(ser);
            console.log("Team creting");
            var headers = {
                'content_type':'application/json',
            }
            const response = await axios.post("http://localhost:8000/dream11/api/TeamCreatedData/",ser,headers);
            
            
            //var datai=[];
            let id = this.props.match.params.id;
            let user = this.props.username;
            this.state.removedPlayers.map( async function (value){
                var sser = {name: value.name,role:value.role,image:value.image,country:value.country,Match_id: id,User_Name:user};
                const response = await axios.post("http://localhost:8000/dream11/api/removePlayers/",sser,headers);
                if(response.status === 200){
                    console.log("removed successfully");
                }
                else if(response.status === 404){
                    console.log("Player not in the team");
                }
            })
            
            this.state.addedPlayers.map(async function (value){
                    //datai = value;
                    console.log(value.name)
                    console.log(id,user);
                    var sser = {name: value.name,role:value.role,image:value.image,country:value.country,Match_id: id,User_Name:user};
                
                    
                    const response = await axios.post("http://localhost:8000/dream11/api/PlayerData/",sser,headers);
                    if(response.status === 200){
                        console.log("inserted successfully");
                    }
            })
            
        }
      }
      else {
          window.alert("You must have atleast 1 wicketkeeper,3 batsmen,3 bowlers,1 allrounder and total of 11 players in your team an atmost 6 players from a team.");
      }
      

  }

  removePlayer(index){
    if(window.confirm("Are you sure you want to remove this player?")){
        let taskList = this.state.addedPlayers.filter((player) => {
            return player.name !== index.name;
        })
        let removedP = this.state.addedPlayers.filter((player) => {
            return player.name == index.name;
        })
        let wkt = this.state.wicketkeeper;
        let bats = this.state.batsman;
        let bowl = this.state.bowler;
        let allr = this.state.allrounder;
        if(index.role.toLowerCase().indexOf("wicketkeeper") !== -1)
            wkt = wkt-1;
        else if(index.role.toLowerCase().indexOf("batsman") !== -1)
            bats = bats-1;
        else if(index.role.toLowerCase().indexOf("bowler") !== -1)
            bowl = bowl-1;
        else if(index.role.toLowerCase().indexOf("allrounder") !== -1)
            allr = allr-1;

        let balance = this.state.availableBalance;
        balance = balance + index.credit;
        console.log(index);

        this.setState( {
            addedPlayers : taskList,
            allrounder: allr,
            wicketkeeper: wkt,
            batsman:bats,
            bowler:bowl,
            availableBalance:balance,
            removedPlayers:removedP,
        })
    }
  }

  handleCheck(val) {
    return this.state.addedPlayers.some(item => val.name === item.name);
  }

  render() {
    
    let home = this.props.match.params.Home_team;
    let away = this.props.match.params.Away_team;
    let series = this.props.match.params.Series_name;
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
        if(value.country.toLowerCase() === this.props.match.params.Home_team.toLowerCase() || value.country.toLowerCase() === this.props.match.params.Away_team.toLowerCase()){
        if(!this.handleCheck(value) ){
            return <div className="profile">
            <div className="photo"><img src={value.image} /></div>
            <div className="content">
                <div className="text">
                    <Link to={`/dashboard/profile/${value.name}/${value.country}`} >{value.name}</Link>
                    <h6><span className="card__category">Credit:{value.credit}</span></h6>
                    <h6><span className="card__category">{value.country}</span></h6>
                </div>
                <div className="btn" onClick={() => this.handleShow(value.name,value.role,value.country,value.image,value.credit)}>
                <span></span>
                </div>
            </div>
            </div>
        }
        else{
            return <div className="profile">
            <div className="photo"><img src={value.image} /></div>
            <div className="content">
                <div className="text">
                    <Link to={`/dashboard/profile/${value.name}/${value.country}`} >{value.name}</Link>
                    <h6><span className="card__category">Credit:{value.credit}</span></h6>
                    <h6><span className="card__category">{value.country}</span></h6>
                </div>
                <div className="btn" onClick={() => this.handleShow(value.name,value.role,value.country,value.image,value.credit)}>
                <div className="check"></div>
                </div>
            </div>
            </div>
        }
    }
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
        return  <div className="column">

            <div className="cards">
                <div className="btnRmv" onClick={()=> this.removePlayer(value)}><span>&times;</span>  </div>
                <Link to={`/dashboard/profile/${value.name}/${value.country}/`} >
                    <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                </Link>
            </div>

        </div>
    }.bind(this));

    let batsmanGeseGa =addedBatsman.map(function (value,index)
    {
        return  <div className="column">

            <div className="cards">

                <div className="btnRmv" onClick={()=> this.removePlayer(value)}><span>&times;</span>  </div>
                <Link to={`/dashboard/profile/${value.name}/${value.country}/`} >
                    <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                </Link>
            </div>

        </div>
    }.bind(this));

    let allrounderGeseGa =addedAllrounder.map(function (value,index)
    {
        return  <div className="column">

            <div className="cards">

                <div className="btnRmv" onClick={()=> this.removePlayer(value)}><span>&times;</span>  </div>
                <Link to={`/dashboard/profile/${value.name}/${value.country}/`} >
                    <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                </Link>
            </div>

        </div>
    }.bind(this));

    let bowlerGeseGa =addedBowler.map(function (value,index)
    {
        return  <div className="column">

            <div className="cards">
                <div className="btnRmv" onClick={()=> this.removePlayer(value)}><span>&times;</span>  </div>
                <Link to={`/dashboard/profile/${value.name}/${value.country}/`} >
                    <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                </Link>

            </div>

        </div>
    }.bind(this));

    //console.log(searchPlayer);

    return(


    <div>
        <h3>Balance:{this.state.availableBalance}</h3>
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
                <button type="button" className="btn button5" onClick={this.SubmitteamHandler} style={{font: "15px"}}>Confirm Team</button>
            </div>
            <div className="buttfix">
            <Link to={`/dashboard/MyTeam/${home}/${away}/${series}/${this.props.match.params.id}/${this.props.username}`} >
                <button type="button" className="btn button5" style={{font: "15px"}}>My Team</button>
            </Link>
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

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null,
      username: state.user
    }
  }
  
export default connect(mapStateToProps, null)(Players);

