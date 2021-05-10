const counterReducer = (state = 0, action) => {
    switch(action.type) {
        case 'GET_TIMERS':
            return state;
        default:
            return state;
    }
}

export default counterReducer;