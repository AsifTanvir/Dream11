import React, { Component } from 'react';
import {Route} from "./index";
//import 'jquery';
import axios from "axios";

class Dashboard extends Component {
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
}
export default  Dashboard;