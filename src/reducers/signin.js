const signinReducer = (state = false, action) => {
    switch(action.type) {
        case 'SIGN_IN':
            console.log("signing in")
            return state;
        case 'SIGN_OUT':
            console.log("signing out")
            return state;
        default:
            return state;
    }
}

export default signinReducer;