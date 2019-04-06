import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

class AddGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Button onClick={this.props.addModal}>Add Group</Button>
    )
  }

}

export default AddGroup;
