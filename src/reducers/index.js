import counterReducer from './counter';
import loggedReducer from './isLogged';
import signInReducer from './signin';
import tokenReducer from './token';
import timerReducer from './timer';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    signIn: signInReducer,
    token: tokenReducer,
    timer: timerReducer
});

export default allReducers;