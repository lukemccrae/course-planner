import React, {Component} from 'react';
import Ding from '../Ding.mp3'

class Completionist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      update: false
    }
  }

  componentDidMount(props) {
    console.log(this.props);
    setTimeout(() => {
      this.props.nextTimer();
    }, 1000);
  }

  render(props) {
    return (
      <audio ref={this.myRef} src={Ding} autoPlay/>
    )
  }

}

export default Completionist;
