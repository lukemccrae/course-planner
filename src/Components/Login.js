import React, {Component} from 'react';
import ShowRegister from './showRegister';
import Register from './Register';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setInStorage} from '../utils/storage';
import styled from 'styled-components';
import 'whatwg-fetch';

const Box = styled.div`

`

class Login extends Component {
  constructor(props) {
      super(props)
    console.log(props)
    this.state = {
      signInEmail: '',
      signInPassword: '',
      showRegister: false
    }

    this.signInRef = React.createRef();
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this)
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this)
    this.onSignIn = this.onSignIn.bind(this)
    this.closeModal = this.closeModal.bind(this);
    this.showRegister = this.showRegister.bind(this);
  }
  

  onTextboxChangeSignInEmail(event) {
    this.setState({signInEmail: event.target.value})
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({signInPassword: event.target.value})
  }

  componentDidMount() {
      this.signInRef.current.focus();
    

  }

  showRegister() {
    this.setState({
      showRegister: !this.state.showRegister
    })
  }

  onSignIn(e) {
    //turn this on when pushing
    e.preventDefault();
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

  closeModal() {
    this.setState({
      startModalIsOpen: false,
    });
  }

  render(props) {
    return (
        <div>
            {this.state.showRegister ? 
            <Register showRegister={this.showRegister}></Register>
        :
        <Box>
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
        </Box>
        }
        <ShowRegister showRegister={this.showRegister} value={this.state.showRegister ? "Already have an account? Login" : "Need to register?"}></ShowRegister>
        </div>
    )
  }
}

export default Login;
