import React, {Component} from 'react';
import ShowRegister from './showRegister';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'whatwg-fetch';
import {setInStorage} from '../utils/storage';

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signInEmail: 'l@l.com',
      signInPassword: 'eeee'
    }

    this.signInRef = React.createRef();
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

  componentDidMount() {
    this.signInRef.current.focus();

    //remove this when pushing
    this.onSignIn()
  }

  onSignIn(e) {
    //turn this on when pushing
    // e.preventDefault();
    fetch(`https://banana-crumble-42815.herokuapp.com/api/account/signin`, {
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
          this.props.loggedIn(json)
          setInStorage('the_main_app', { token: json.token })
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
            <h3>Group Timer</h3>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={this.signInEmail}
                  onChange={this.onTextboxChangeSignInEmail}
                  ref={this.signInRef}
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
              <Button onClick={this.onSignIn} type="submit">
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

export default Signin;
