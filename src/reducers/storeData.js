import { getTimers } from "../actions"
import {useSelector} from 'react-redux';

const storeDataReducer = (state = {groups: {}, log: []}, action) => {
    switch(action.type) {
        case 'STORE_DATA':
            return getTimers()
    }
}

function getTimers() {
    console.log("hi")
    const counter = useSelector(state => state.counter);
    fetch(`https://banana-crumble-42815.herokuapp.com/timer?token=${state.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {

      //add object for creating more groups
      //displays at the end of the groups list in Dash
      let addGroup = {
        box: [""],
        editOpen: false,
        hash: "newgroup",
        name: "New Group",
        timers: [
          {
            name: "New Timer",
            length: 3,
          }
        ],
        user: "current user"
      }
      json.groups.push(addGroup);

      if(json.success) {
        console.log(json)
        this.setState({
          timers: json.timers,
          groups: json.groups,
          userName: json.username,
          log: json.log
        })

      } else {
        this.setState({
          timerError: json.message,
          isLoading: false
        })
      }
    });
}