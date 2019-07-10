import React, {Component, omponent} from 'react';
import axios from "axios";

class Players extends Component {
      constructor(props) {
          super(props);
          this.state = {
            users:[],
            };
          this.loadPlayers = this.loadPlayers.bind(this);
      }
      componentWillMount(){
            this.loadUsers();
        }

      async loadUsers()
      {
        const promise = await axios.get("http://localhost:8000/dream11/api/UserData/");
        const status = promise.status;
        if(status===200)
        {
          const data = promise.data.data;
            this.setState({users:data});
        }
      }

      render(){
          return (
              <div>
                  <h1>hello</h1>
              </div>
          )
      }
}
export default Players;