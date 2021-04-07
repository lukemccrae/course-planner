import React, {useState} from 'react';
import Register from './Register';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setInStorage} from '../utils/storage';
import styled from 'styled-components';
import 'whatwg-fetch';

const Box = styled.div`

`
function Login(props) {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSignIn = (e) => {
    //turn this on when pushing
    e.preventDefault();
    fetch(`https://banana-crumble-42815.herokuapp.com/api/account/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          props.loggedIn(json)
          setInStorage('the_main_app', { token: json.token })
        } else {
          console.log(json)
          alert("Invalid signin")
        }
      });
  }

    return (
        <div>
            {showRegister ? 
            <Register showRegister={showRegister}></Register>
        :
        <Box>
            <Form>
                <Form.Group controlId="formBasicEmail">
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                </Form.Group>
                <Button onClick={onSignIn} type="submit">
                Sign In
                </Button>
            </Form>
        </Box>
        }
        <a href="#" onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? "Already have an account? Login" : "Need to register?"}
        </a>
      </div>
    )
}

export default Login;
