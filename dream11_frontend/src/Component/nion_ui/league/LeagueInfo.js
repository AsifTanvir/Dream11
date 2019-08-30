import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import MaterialTable from "material-table";
import axios from "axios";

class LeagueInfo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            columns: [
                { title: "Sl No.", field: "ranking"},
                { title: "Username", field: "name"},
              ],
            leagues:[],
        }
        this.loadLeagues = this.loadLeagues.bind(this);
    }
    componentDidMount(){
        this.loadLeagues();
    }
    async loadLeagues(){
        let leagueName=this.props.match.params.league_name;
        console.log(leagueName);
        /*var data ='{ ';
        this.state.addedPlayers.map(function (value) {
            data += '{ "name":"'+value.name+'","role":"'+value.role+'","country":"'+value.country+'","image":"'+value.image+'" },'
        })
        data+=' }'*/
        
          var headers = {
              'content_type':'application/json',
          }
          
          //var datai=[];
          var ser = {league_name: leagueName};
          const response = await axios.post("http://localhost:8000/dream11/api/leagueInfo/",ser,headers);
            if(response.status === 200){
                console.log("inserted successfully");
                console.log(response.data);
                console.log(response.data.data.league_name);
                let responsedata = response.data.data;
                for (let index = 0; index < responsedata.length; index++) {
                    responsedata[index].ranking = index+1;
                    
                }
                this.setState({
                    leagues:responsedata
                })
            }
    }
    
    render() {
        return (
            <Paper>
                <MaterialTable
                    title={this.props.match.params.league_name}
                    columns={this.state.columns}
                    data={this.state.leagues}
                    options={{
                        search: true,
                        paging: false
                    }}
                    
                />
            </Paper>
        )
    }
}

export default LeagueInfo