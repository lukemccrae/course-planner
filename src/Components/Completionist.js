import React, {Component} from 'react';

class Completionist extends Component {
  constructor(props) {
    super(props)
    props.nextTimer()

    this.state = {}
  }

  render(props) {
    return (
      <span>is done.</span>
    )
  }

}

export default Completionist;
