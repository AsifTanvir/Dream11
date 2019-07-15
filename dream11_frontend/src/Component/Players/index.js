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
    };
    this.handleShow = this.handleShow.bind(this);
    this.loadPlayers = this.loadPlayers.bind(this);
    this.allrounderHandler = this.allrounderHandler.bind(this);
    this.batsmanHandler = this.batsmanHandler.bind(this);
    this.bowlerHandler = this.bowlerHandler.bind(this);
    this.wicketkeeperHandler = this.wicketkeeperHandler.bind(this);
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

  updateSearch(event){
    this.setState({
      search: event.target.value})
      console.log(this.state.search);
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
    console.log("value" + name +role +country+image);
    let arr = this.state.addedPlayers.slice();
    let playerClicked = this.state.players.filter( (player) => {
            return player.name.toLowerCase().indexOf(name.toString().toLowerCase()) !== -1 && player.role.toLowerCase().indexOf(role.toString().toLowerCase()) !== -1
        && player.country.toLowerCase().indexOf(country.toString().toLowerCase()) !== -1 && player.image.toLowerCase().indexOf(image.toString().toLowerCase()) !== -1;
        }

    )
    let flag = 0;
    let i;
    for(i=0; i< arr.length ;i++){

        if(name.toString().toLowerCase().indexOf(arr[i].name.toLowerCase()) !== -1 && role.toString().toLowerCase().indexOf(arr[i].role.toLowerCase()) !== -1
        && country.toString().toLowerCase().indexOf(arr[i].country.toLowerCase()) !== -1 && image.toString().toLowerCase().indexOf(arr[i].image.toLowerCase()) !== -1){
            flag = 1;
            break;
        }
    }
    if(flag === 0){
        console.log("ffffffff")
        var person = {name:name, role:role, country:country, image:image};
        arr.push(person);
    }
    console.log("arr" + arr);
    this.setState({
      addedPlayers : arr,
      playerAdded : !this.state.playerAdded
    });
    console.log("addedlist"+this.state.addedPlayers);
  }

 SubmitteamHandler(){
      console.log("team submitted");

 }

  render() {


      console.log(this.state.role);
      let searchPlayer;
      if( this.state.role.indexOf("batsman") !== -1){
          searchPlayer = this.state.players.filter(
              (player) => {
                  return player.role.toLowerCase().indexOf("wicketkeeper") !== -1 &&
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
                  return player.role.toLowerCase().indexOf("batsman") !== -1 &&
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
                  <Link to={`/dream11/core/login/loggedIN/${value.name}`} >{value.name}</Link>
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
      console.log(this.state.addedPlayers);
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


    //console.log(searchPlayer);
    
    return(

    <div>
        <div className="total_team">
        <div className="container team">
            <div className="coloredDiv">
            <h3 > <span className="label label-success create_team card__category">Wicketkeeper</span></h3>
            </div>
            <div className="team_space rows">
            {
                addedWkt.map(function (value,index) {
                    return  <div class="column">

                        <div className="cards">
                            <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                        </div>

                    </div>
                })

            }
            </div>

        </div>
        <div className="container team">
            <div className="coloredDiv">
                <h3> <span className="label label-success create_team card__category">Batsman</span></h3>
            </div>

            <div className="team_space rows">
            {
                addedBatsman.map(function (value,index) {
                    return  <div class="column">

                        <div className="cards">
                            <img className="card-img-top card_image" src={value.image} alt="Card image"
                                ></img>
                        </div>

                    </div>
                })

            }
            </div>

        </div>
        <div className="container team">
            <div className="coloredDiv">
                <h3> <span className="label label-success create_team card__category">All rounder</span></h3>
            </div>

            <div className="team_space rows">
            {
                addedAllrounder.map(function (value,index) {
                    return  <div class="column">

                        <div className="cards">
                            <img className="card-img-top card_image" src={value.image} alt="Card image"
                                ></img>
                        </div>

                    </div>
                })

            }
            </div>
        </div>
        <div className="container team">
            <div className="coloredDiv">
                <h3> <span className="label label-success create_team card__category">Bowler</span></h3>
            </div>

            <div className="team_space rows">
            {
                addedBowler.map(function (value,index) {
                    return  <div class="column">

                        <div className="cards">
                            <img className="card-img-top card_image" src={value.image} alt="Card image"></img>
                        </div>

                    </div>
                })

                            /*<section className="cards">
            <article className="card card--1">
                <div className="card__info-hover">
                </div>
                <div className="card__img">

                </div>
                <a href="#" className="card_link">
                    <div className="card__img--hover">

                    </div>
                </a>
                    <div className="card__info">
                            <h3 className="card__title">{value.name}</h3>
                            <span className="card__category"> {value.country}</span>
                    </div>
            </article>
        </section>*/


            }
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
