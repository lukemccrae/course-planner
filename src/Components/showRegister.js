import React, {Component} from 'react';

class ShowRegister extends Component {
  render() {
    return (
      <div>
        <a href="#" onClick={this.props.showRegister}>
          {this.props.value}
        </a>
      </div>
    )
  }
}

export default ShowRegister;
