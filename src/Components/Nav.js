import React, {useState} from 'react';
import Login from './Login';

import AppBar from './AppBar';
import 'react-dropdown/style.css';
import Modal from 'react-modal';
import { useEffect } from 'react';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '50vw'
  }
};

function Nav(props) {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  function closeModal() {
    setLoginModalIsOpen(false)
  }


  function onSelect(e) {
    console.log(e)
    switch(e.value){
      case 'github':
        window.open('https://github.com/lukemccrae/course-planner', '_blank');
        break;
      case 'Login': 
        openLoginModal();
        break;
      case 'Logout': 
        onLogout();
        break;
    }
  }

  function onLogout() {
    fetch(`https://banana-crumble-42815.herokuapp.com/api/account/logout?token=${props.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(callback => {
        if(callback.status === 200) {
          props.loggedOut();
        } else {
          console.log(callback);
        }
      });
  }

  function openLoginModal() {
    setLoginModalIsOpen(true)
  }

    return (
      <div>
        <AppBar username={props.username} onSelect={onSelect} setLoginModalIsOpen={props.setLoginModalIsOpen} onLogout={onLogout}></AppBar>
      </div>
    )

}

export default Nav;
