import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import axios from "axios";
import { connect } from 'react-redux';

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

export class CreateLeague extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name:'',
          pass:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.SubmitteamHandler = this.SubmitteamHandler.bind(this);
    }
    
    handleChange = name => ({target : {value}}) => {
        this.setState({
            [name]:value
        })
        console.log(this.state.name);
        console.log(this.state.pass);
    };
    async SubmitteamHandler(){
        this.props.handlec();
        let userName = this.props.username;
        console.log(userName);
        //let userID = '1';
        /*var data ='{ ';
        this.state.addedPlayers.map(function (value) {
            data += '{ "name":"'+value.name+'","role":"'+value.role+'","country":"'+value.country+'","image":"'+value.image+'" },'
        })
        data+=' }'*/
        if(window.confirm("Are you sure you want to confirm this changes?")){
          var headers = {
              'content_type':'application/json',
          }
          
          //var datai=[];
          var ser = {name: userName , league_name: this.state.name , password: this.state.pass};
          const response = await axios.post("http://localhost:8000/dream11/api/leagues/",ser,headers);
            if(response.status === 200){
                console.log("inserted successfully");
            }
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
            <Button variant="raised" size="small" onClick={this.SubmitteamHandler} >
            <SaveIcon />
                Save
            </Button> 
          </div>
        </div>
      );
  }
  
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null,
      username: state.user
    }
  }
  
export default connect(mapStateToProps, null)(CreateLeague);
