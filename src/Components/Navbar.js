import React, {Component} from 'react';
import Logout from './Logout';
import AddGroup from './AddGroup';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';



class Dash extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
        <Navbar bg="light">
          <Container>
            <div>Group Timer</div>
            <Logout loggedOut={this.props.loggedOut} token={this.props.token}></Logout>
            <AddGroup addModal={this.props.addModal}></AddGroup>
          </Container>
        </Navbar>
    )
  }

}

export default Dash;
