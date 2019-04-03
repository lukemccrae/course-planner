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
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      //verify token
      fetch('/api/account/verify?token=' + obj.token).then(res => res.json()).then(json => {
        if (json.success) {
          this.setState({token: obj.token, isLoading: false})
        } else {
          this.setState({isLoading: false})
        }
      }).then(fetch('api/user?token=' + obj.token).then(res => res.json()).then(json => {
        if (json.success) {
          this.setState({timers: json.data})
        }
      }));
    } else {
      this.setState({isLoading: false})
    }
  }

  showRegister() {
    this.setState({
      showRegister: !this.state.showRegister
    })
  }

  render() {
    if (this.state.showRegister === false) {
      return (
        <Signin onSignIn={this.onSignIn} showRegister={this.showRegister}></Signin>
      );
    }
    return (
      <Register showRegister={this.showRegister}></Register>
    )
  }
}

export default App;
