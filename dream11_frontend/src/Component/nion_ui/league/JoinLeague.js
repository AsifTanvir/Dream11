import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import axios from "axios";
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
  }));

export default class JoinLeague extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name:'',
          pass:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.JoinLeagueHandler = this.JoinLeagueHandler.bind(this);
    }
    
    handleChange = name => ({target : {value}}) => {
        this.setState({
            [name]:value
        })
    };
    async JoinLeagueHandler(){
        let userName='nion';
        /*var data ='{ ';
        this.state.addedPlayers.map(function (value) {
            data += '{ "name":"'+value.name+'","role":"'+value.role+'","country":"'+value.country+'","image":"'+value.image+'" },'
        })
        data+=' }'*/
        
          var headers = {
              'content_type':'application/json',
          }
          
          //var datai=[];
          var ser = {name: userName , league_name: this.state.name , password: this.state.pass};
          const response = await axios.post("http://localhost:8000/dream11/api/joinLeague/",ser,headers);
            if(response.status === 200){
              window.alert("League Joined Successfully");
                // const def = () => <Redirect to={`/dream11/core/login/loggedIN/contests/${this.state.name}/`} />
            }
            else if(response.status === 302){
              window.alert("Already Joined");
            }
            else{
                window.alert("League Name or Password Does not match")
            }
    }

    

  render(){
    
    return (
        <div>
          <div>
            <form>
                <TextField 
                    id="input-with-icon-grid" 
                    label="League name"  
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />
                <br />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    value={this.state.pass}
                    onChange={this.handleChange('pass')}
                    margin="normal"
    
                />
            </form> 
            <RouterLink to={`/dream11/core/login/loggedIN/league_list/${this.state.name}/`}>
              <Button variant="raised" size="small" onClick={this.JoinLeagueHandler} >
              <ExitToAppIcon />
                  Join
              </Button> 
            </RouterLink>
          </div>
        </div>
      );
  }
  
}