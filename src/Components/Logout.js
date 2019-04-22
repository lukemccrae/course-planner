import React, {Component} from 'react';

class Logout extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout() {
    fetch(`http://localhost:3000/api/account/logout?token=${this.props.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(callback => {
        if(callback.status === 200) {
          this.props.loggedOut();
        } else {
          console.log(callback);
        }
      });
  }

  render() {
    return (
      <div onClick={this.onLogout}>Logout</div>
    )
  }

}

export default Logout;
