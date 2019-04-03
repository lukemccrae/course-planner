import React, {Component} from 'react';
import ShowRegister from './showRegister';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'whatwg-fetch';
import {setInStorage} from '../utils/storage';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this)
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this)
    this.onSignIn = this.onSignIn.bind(this)
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({signInEmail: event.target.value})
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({signInPassword: event.target.value})
  }

  onSignIn() {
    fetch(`/api/account/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          setInStorage('the_main_app', { token: json.token })
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
            token: json.token,
            timers: json.timers,
            username: json.user,
            groups: json.groups
          })
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          })
        }
      });
  }

  render(props) {
    return (
      <div className="App">
        <header className="App-header"></header>
        <div className="vertical-center">
          <div className="container">
            <h3>Routine Timer</h3>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={this.signInEmail}
                  onChange={this.onTextboxChangeSignInEmail}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.signInPassword}
                  onChange={this.onTextboxChangeSignInPassword}
                />
              </Form.Group>
              <Button onClick={this.onSignIn} variant="primary" type="submit">
                Sign In
              </Button>
            </Form>
            <ShowRegister value="Need to register?" showRegister={this.props.showRegister}></ShowRegister>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
