import React from 'react';
import styled from 'styled-components';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GithubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CourseSelect from "./CourseSelect";
import {HideUsernameMobileNav, HideCorsaMobileNav, HideLogoMobileNav} from './Grid';
import { useUserContext } from '../Providers/UserProvider';

const Header = styled.header`
  height: 60px;
  display: flex;
  background-color: grey;
  justify-content: space-between;
  align-items: center;

`

function Nav(props) {
  const {username} = useUserContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function onLogout() {
    const token = JSON.parse(localStorage.course_planner).token;
    fetch(`https://banana-crumble-42815.herokuapp.com/api/account/logout?token=${token}`, {
      // fetch(`http://localhost:3005/api/account/logout?token=${token}`, {
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

    return (
      <div>
        <Header>
          <div>
            <HideLogoMobileNav style={{margin: "0 0 0 20px"}}>
              <svg style={{paddingBottom: "10px"}} version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="30.000000pt" height="30.000000pt" viewBox="0 0 295.000000 295.000000"
                preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,295.000000) scale(0.100000,-0.100000)"
                fill="white" stroke="none">
                <path d="M1098 1815 c-189 -377 -345 -685 -348 -685 -3 0 -43 75 -88 166 -46
                92 -85 165 -87 163 -5 -6 -505 -1009 -505 -1014 0 -3 633 -5 1406 -5 845 0
                1404 4 1402 9 -12 33 -733 1481 -738 1481 -3 0 -51 -91 -107 -202 l-101 -203
                -241 488 c-133 268 -243 487 -246 487 -3 0 -159 -308 -347 -685z"/>
                </g>
              </svg>
            </HideLogoMobileNav>
            <HideCorsaMobileNav style={{padding: "15px 0 0 15px", color: "white", margin: "0 15px 0 0"}}>Corsa</HideCorsaMobileNav>
            <CourseSelect courseId={props.id} courseToken={props.token} editCourse={props.editCourse}></CourseSelect>
          <Button style={{color: "white", borderColor: "white", margin: "0 5px 0 5px"}} onClick={() => props.saveNewCourse()} variant="outlined">New Course</Button>
          </div>
          <div>
          <HideUsernameMobileNav style={{fontSize: "12px"}}> {username}</HideUsernameMobileNav>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => {e.preventDefault(); window.open('https://github.com/lukemccrae/course-planner', '_blank')}}
                color="inherit"
              >
                <GithubIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </Menu>
          </div>
        </Header>
      </div>
    )
}

export default Nav;
