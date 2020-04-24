import React, {Component} from 'react';
import './App.css';
import 'whatwg-fetch';
import {getFromStorage} from './utils/storage';
import Register from './Components/Register';
import Signin from './Components/Signin';
import Dash from './Components/Dash';
import { css } from "@emotion/core";
import Container from 'react-bootstrap/Container';
import ClockLoader from "react-spinners/ClockLoader";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      timers: [],
      username: '',
      log: [],
      showRegister: false
    }
    this.showRegister = this.showRegister.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.loggedOut = this.loggedOut.bind(this);
    this.getTimers = this.getTimers.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      //verify token
      fetch('https://banana-crumble-42815.herokuapp.com/api/account/verify?token=' + obj.token).then(res => res.json()).then(json => {
        if (json.success) {
          this.setState({token: obj.token, groups: json.groups, log: json.log, username: json.email, isLoading: false})
        } else {
          this.setState({isLoading: false})
        }
      })
      // .then(fetch('http://localhost:3000/api/account?token=' + obj.token).then(res => res.json()).then(json => {
      //   if (json.success) {
      //     this.setState({timers: json.data})
      //   }
      // }));
    } else {
      this.setState({isLoading: false})
    }
  }

  showRegister() {
    this.setState({
      showRegister: !this.state.showRegister
    })
  }

  loggedIn(args) {
    this.setState({
      token: args.token,
      username: args.user,
      timers: args.timers,
      groups: args.groups,
      log: args.log,
      userId: args.id
    })
  }

  loggedOut() {
    localStorage.clear();
    this.setState({
      token: ''
    })
  }
  getTimers(token) {
    fetch(`https://banana-crumble-42815.herokuapp.com/timer?token=${this.state.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        this.setState({
          timers: json.timers,
          groups: json.groups,
          userName: json.username,
          log: json.log
        })
      } else {
        this.setState({
          timerError: json.message,
          isLoading: false
        })
      }
    });
  }

  render() {
    if(this.state.token !== '') {
      return (
        <Dash
          groups={this.state.groups}
          timers={this.state.timers}
          username={this.state.username}
          getTimers={this.getTimers}
          loggedOut={this.loggedOut}
          log={this.state.log}
          userId={this.state.userId}
        >
        </Dash>
      )
    }

    if(getFromStorage('the_main_app') !== null) {
      return (
        <div
        className="vertical-center">
          <Container>
            <ClockLoader
            css={override}
            size={150}
            color={"#007bff"}
            loading={this.state.loading}
          />
          </Container>
        </div>
      )
    }
    if(this.state.token === '') {
      if (this.state.showRegister === false) {
        return (
          <Signin loggedIn={this.loggedIn} onSignIn={this.onSignIn} showRegister={this.showRegister}></Signin>
        );
      }
      return (
        <Register showRegister={this.showRegister}></Register>
      )
    }
  }
}

export default App;
