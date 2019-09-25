import React, {Component} from 'react';
import Ding from '../Ding.mp3';
import Button from 'react-bootstrap/Button';

class Completionist extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render(props) {
    return (
      <div>
        <Button onClick={this.props.nextTimer}>Next</Button>
        <audio loop ref={this.myRef} src={Ding} autoPlay/>
      </div>
    )
  }

}

export default Completionist;
