import React, {Component} from 'react';
import './App.css';
import 'whatwg-fetch';
import {getFromStorage} from './utils/storage';
import Register from './Components/Register';
import Signin from './Components/Signin';
import Dash from './Components/Dash';



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
          console.log(json);
          this.setState({token: obj.token, isLoading: false})
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
      log: args.log
    })
  }

  loggedOut() {
    this.setState({
      token: ''
    })
  }

  getTimers(token) {
    console.log('get timers');
    
    fetch(`https://banana-crumble-42815.herokuapp.com/timer?token=${token}`, {
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
    return (
      <Dash
        groups={this.state.groups}
        timers={this.state.timers}
        username={this.state.username}
        getTimers={this.getTimers}
        loggedOut={this.loggedOut}
        log={this.state.log}
      >
      </Dash>
    )
  }
}

export default App;
