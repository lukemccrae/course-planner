import React, {Component} from 'react';

class Completionist extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render(props) {
    this.props.nextTimer();
    return (
      <span>is done.</span>
    )
  }

}

export default Completionist;
