import React, {useState} from 'react';
import Register from './Register';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setInStorage} from '../utils/storage';
import styled from 'styled-components';
import { useUserContext } from '../Providers/UserProvider';
import 'whatwg-fetch';

const Box = styled.div`
  display: flex;
  justify-content: center;
`
function Login(props) {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setToken, setCourseList} = useUserContext();



  const onSignIn = (e) => {
    e.preventDefault();
      fetch(`https://glacial-brushlands-65545.herokuapp.com/https://banana-crumble-42815.herokuapp.com/course/api/account/signin`, {
        // fetch(`http://localhost:3005/course/api/account/signin`, {
        // fetch(`https://thawing-eyrie-65129.herokuapp.com/course/api/account/signin`, {
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
          setInStorage('course_planner', { token: json.token })
          setToken(json.token)
          setCourseList(json.courseList)

          //close login modal
          props.setLoginModalIsOpen(false);
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
          <div style={{display: "flex", width: "100%", justifyContent: "center", flexDirection: "column"}}>
              <h4 style={{margin: "0 0 15px 0"}}>Log in to Corsa</h4>
            <Form style={{width: "30vw"}}>
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
            </div>
        </Box>
        }
        <a href="#" onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? "Already have an account? Login" : "Need to register?"}
        </a>
      </div>
    )
}

export default Login;
