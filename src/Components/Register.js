import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Register(props) {
  console.log(props)
  // constructor(props) {
  //   super(props)

  //   state = {
  //     signInError: '',
  //     signInEmail: '',
  //     signInPassword: '',
  //     signUpFirstName: '',
  //     signUpLastName: '',
  //     signUpEmail: '',
  //     signUpPassword: '',
  //   }
  //   onSignUp = onSignUp.bind(this)
  //   onTextboxChangeSignUpEmail = onTextboxChangeSignUpEmail.bind(this)
  //   onTextboxChangeSignUpPassword = onTextboxChangeSignUpPassword.bind(this)
  //   onTextboxChangeSignUpFirstName = onTextboxChangeSignUpFirstName.bind(this)
  //   onTextboxChangeSignUpLastName = onTextboxChangeSignUpLastName.bind(this)
  // }

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpFirstName, setSignUpFirstName] = useState('');
  const [signUpLastName, setSignUpLastName] = useState('');

  function onTextboxChangeSignUpEmail(event) {
    setSignUpEmail(event.target.value);
  }

  function onTextboxChangeSignUpPassword(event) {
    setSignUpPassword(event.target.value);
  }

  function onTextboxChangeSignUpFirstName(event) {
    setSignUpFirstName(event.target.value);
  }

  function onSignUp() {
    fetch(`https://banana-crumble-42815.herokuapp.com/api/account/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          props.setLogin(signUpEmail, signUpPassword)

          setSignUpEmail('');
          setSignUpPassword('');
          setSignUpFirstName('');

          // props.showRegister();
        } else {
          console.log("error signing up")
          console.log(json);
        }
      });
  }

  return (
      <div>
            <Row>
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Control
                    placeholder="First name"
                    value={signUpFirstName}
                    onChange={onTextboxChangeSignUpFirstName}
                  />
                </Form.Group>
              </Col>
            </Row>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={signUpEmail}
              onChange={onTextboxChangeSignUpEmail}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={onTextboxChangeSignUpPassword}
            />
          </Form.Group>
          <Button onClick={onSignUp} variant="primary" type="submit">
            Register
          </Button>
      </div>

  )
}

export default Register;
