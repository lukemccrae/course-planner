import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

class Start extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.start = this.start.bind(this)
  }

  start() {
    console.log(this.props.group);
  }

  render() {
    return (
      <Button onClick={this.start}>Start</Button>
    )
  }

}

export default Start;
