import React, {Component} from 'react';
import {getFromStorage} from '../utils/storage';

class Logout extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout() {
    fetch(`https://banana-crumble-42815.herokuapp.com/api/account/logout?token=${this.props.token}`, {
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
    <div>
      {getFromStorage("the_main_app") ? <div onClick={this.onLogout}>Logout</div> : <div onClick={this.props.openLoginModal}>Login</div>}
    </div> )
  }

}

export default Logout;
