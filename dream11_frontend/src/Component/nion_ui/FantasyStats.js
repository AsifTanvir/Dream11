import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import MaterialTable from "material-table";
import axios from "axios";

class FantasyStats extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            columns: [
                { title: "Ranking", field: "ranking"},
                { title: "Player Name", field: "name"},
                // { title: "Country", field: "country"},
                { title: "Total Points", field: "total_points"}
              ],
            batsman: [],
            bowler: [],
            allrounder: [],
            wicketkeeper:[]
        }
        this.loadStats = this.loadStats.bind(this);
    }

    componentWillMount(){
        this.loadStats();
      }

    async loadStats(){
        const home = 'Bangladesh'
        const away = 'Sri Lanka'
        var ser = {hometeam: home, awayteam: away};
        var headers = {
            'content_type':'application/json',
        }
        const response = await axios.post("http://127.0.0.1:8000/dream11/api/FantasyStats/",ser,headers);
        console.log(response.data);
        const responsedata = response.data;
        for (let i = 0; i < responsedata.allrounder.length; i++) {
            responsedata.allrounder[i].ranking = i+1;
        }
        for (let i = 0; i < responsedata.batsmen.length; i++) {
            responsedata.batsmen[i].ranking = i+1;
        }
        for (let i = 0; i < responsedata.bowlers.length; i++) {
            responsedata.bowlers[i].ranking = i+1;
        }
        for (let i = 0; i < responsedata.wicketkeepers.length; i++) {
            responsedata.wicketkeepers[i].ranking = i+1;
        }
        
        this.setState({
            batsman: responsedata.batsmen,
            bowler: responsedata.bowlers,
            allrounder: responsedata.allrounder,
            wicketkeeper: responsedata.wicketkeepers
        });
    }
    render() {
        return (
            <React.Fragment>
                <Paper>
                    <MaterialTable
                        title="Top Batsmen"
                        columns={this.state.columns}
                        data={this.state.batsman}
                        options={{
                            search: false,
                            paging: false
                        }}
                        
                    />
                </Paper>
                <Paper>
                    <MaterialTable
                        title="Top Bowlers"
                        columns={this.state.columns}
                        data={this.state.bowler}
                        options={{
                            search: false,
                            paging: false
                        }}
                        
                    />
                </Paper>
                <Paper>
                    <MaterialTable
                        title="Top Allrounders"
                        columns={this.state.columns}
                        data={this.state.allrounder}
                        options={{
                            search: false,
                            paging: false
                        }}
                        
                    />
                </Paper>
                <Paper>
                    <MaterialTable
                        title="Top Wicketkeepers"
                        columns={this.state.columns}
                        data={this.state.wicketkeeper}
                        options={{
                            search: false,
                            paging: false
                        }}
                        
                    />
                </Paper>
            </React.Fragment>
        )
    }
}

export default FantasyStats
