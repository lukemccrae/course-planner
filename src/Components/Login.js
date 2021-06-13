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
      fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/api/account/signin`, {
      method: 'POST',
      headers: {
        'origin': 'https://group-timer.firebaseapp.com/',
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

          //close login modal
          props.closeModal();
        } else {
          console.log(json)
        }
      });
  }

  function setLogin(email, pass) {
    setEmail(email);
    setPassword(pass);
    setShowRegister(false);
  }

    return (
        <div>
            {showRegister ? 
            <Register setLogin={setLogin}></Register>

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
