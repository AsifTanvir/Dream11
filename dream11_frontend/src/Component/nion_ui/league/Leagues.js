import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import MaterialTable from "material-table";
import axios from "axios";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router';

class Leagues extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            columns: [
                { title: "Number", field: "ranking"},
                { title: "League Name", field: "league_name"},
              ],
            leagues:[],
            selectedRow: null,
        }
        this.loadLeagues = this.loadLeagues.bind(this);
        this.visitLeague = this.visitLeague.bind(this);
    }
    componentDidMount(){
        this.loadLeagues();
    }
    async loadLeagues(){
        let userName=this.props.match.params.userName;
        /*var data ='{ ';
        this.state.addedPlayers.map(function (value) {
            data += '{ "name":"'+value.name+'","role":"'+value.role+'","country":"'+value.country+'","image":"'+value.image+'" },'
        })
        data+=' }'*/
        
          var headers = {
              'content_type':'application/json',
          }
          
          //var datai=[];
          var ser = {name: userName};
          const response = await axios.post("http://localhost:8000/dream11/api/userLeagues/",ser,headers);
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

    visitLeague(leagueName){
        let lName = leagueName.league_name
        console.log(lName)
        
        return <Link href={`/dashboard/league_list/${lName}/`} />
    }
    
    render() {
        return (
            <Paper>
                <MaterialTable
                    title="My Leagues"
                    columns={this.state.columns}
                    data={this.state.leagues}
                    onRowClick={((evt, selectedRow) => <Link href={`/dashboard/league_list/${selectedRow.league_name}/`} />)}
                    options={{
                        search: true,
                        paging: false,
                    }}
                />
            </Paper>
        )
    }
}

export default Leagues