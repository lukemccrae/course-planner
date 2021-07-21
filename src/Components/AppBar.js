import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {getFromStorage} from '../utils/storage';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GithubIcon from '@material-ui/icons/GitHub';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from '../corsa.svg';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  color: {
      color: 'red'
  }
  
}));

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
//   const open = true;

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar className="nav">
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <span>
            <svg style={{marginBottom: "10px"}} version="1.0" xmlns="http://www.w3.org/2000/svg"
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
            </span>
            <h4 style={{margin: "0 0 0 15px", display: "inline"}}>Corsa</h4>
          </Typography> 
          {auth && (
            <div>
              <p style={{display: "inline", fontSize: "12px"}}> {props.username}</p>
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
                {getFromStorage("course_planner") ? <MenuItem onClick={props.onLogout}>Logout</MenuItem> : <MenuItem onClick={() => props.setLoginModalIsOpen(true)}>Login</MenuItem>}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}