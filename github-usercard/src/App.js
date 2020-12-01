import React from "react";
import axios from "axios";
import fetchUserData from "./services/fetchUserData";
import { API_LINK, initialUser } from "./services/constants";
import './App.css';

class App extends React.Component {
  state = {
    userInfo: {},
    userFollowers: [],
    searchInput: ""
  }

  componentDidMount() {
    fetchUserData(initialUser)
      .then((res) => {
        this.setState({
          userInfo: res.data,
        });
      })
      .catch(err => console.log(err));

      axios.get(API_LINK + initialUser + "/followers")
      .then((res) => {
        console.log(res);
        this.setState({
          userFollowers: res.data
        });
      })
      .catch(err => console.log(err));
  }

  onChange = (event) => {
    this.setState({
      searchInput: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.searchInput);
    fetchUserData(this.state.searchInput)
      .then((res) => {
        this.setState({
          userInfo: res.data,
        });
      })
      .catch(err => console.log(err));

      axios.get(API_LINK + this.state.searchInput + "/followers")
      .then((res) => {
        console.log(res);
        this.setState({
          userFollowers: res.data
        });
      })
      .catch(err => console.log(err));

      this.setState({
        searchInput: ""
      });

  }

  render() {
    let userState = this.state.userInfo;
    let user = userState.login;
    let userFollowerState = this.state.userFollowers;

    return (
      <div>
        <h1>Get a Github User's Card!</h1>

        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.searchInput}
            placeholder="Search for a user"
            onChange={this.onChange} />
          <button>Search</button>
        </form>

        <div>
          <h2>{user}</h2>

          <img width="300" src={userState.avatar_url} alt={user} />
          <br></br>

          <a href={userState.html_url} target="_blank">{`${user}'s Github Profile`}</a>

          <p>Following: {userState.following}</p>

          <p>Followed by: </p>

          <div>
            {
              !userFollowerState ? "Loading follower information" :
              userFollowerState.map(follower => {
                return (
                  <div key={follower.id}>
                    <h4>{follower.login}</h4>
                    <img width="150" src={follower.avatar_url} alt={follower.login} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App;
