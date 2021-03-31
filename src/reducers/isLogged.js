const loggedReducer = (state = false, action) => {
    switch(action.type) {
        case 'SIGN_IN':
            return state;
        case 'LOG_OUT':
            return state;
        default:
            return false;
    }
}

export default loggedReducer;