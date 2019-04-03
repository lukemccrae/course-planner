import React, {Component} from 'react';
import './App.css';
import 'whatwg-fetch';
import {getFromStorage} from './utils/storage';
import Register from './Components/Register';
import Signin from './Components/Signin';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      timers: [],
      username: '',
      showRegister: false
    }
    this.showRegister = this.showRegister.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      console.log(obj);
      //verify token
      fetch('http://localhost:3000/api/account/verify?token=' + obj.token).then(res => res.json()).then(json => {
        if (json.success) {
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
      groups: args.groups
    })
    console.log(this.state);
  }

  render() {
    if(!this.state.token) {
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
      <div>hi</div>
    )
  }
}

export default App;
