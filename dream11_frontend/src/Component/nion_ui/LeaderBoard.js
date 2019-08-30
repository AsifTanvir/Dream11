import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import MaterialTable from "material-table";
import axios from "axios";

class LeaderBoard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            columns: [
                { title: "Ranking", field: "ranking"},
                { title: "Username", field: "name"},
                { title: "Points", field: "points"}
              ],
            data: [

            ]
        }
        this.loadLeaderBoard = this.loadLeaderBoard.bind(this);
    }

    componentWillMount(){
        this.loadLeaderBoard();
      }

    async loadLeaderBoard(){
        const home = 'INDIA'
        const away = 'NEW-ZEALAND'
        var ser = {hometeam: home, awayteam: away};
        var headers = {
            'content_type':'application/json',
        }
        const response = await axios.post("http://127.0.0.1:8000/dream11/api/LeaderBoard/",ser,headers);
        console.log(response.data);
        console.log(response.data.data);
        const responsedata = response.data.data;
        console.log(responsedata);
        for (let index = 0; index < responsedata.length; index++) {
            responsedata[index].ranking = index+1;
            
        }
        
        this.setState({
            data: response.data.data
        });
    }
    render() {
        console.log(this.state.data)
        return (
            <Paper>
                <MaterialTable
                    title="Leaderboard"
                    columns={this.state.columns}
                    data={this.state.data}
                    options={{
                        search: true,
                        paging: false
                    }}
                    
                />
            </Paper>
        )
    }
}

export default LeaderBoard
