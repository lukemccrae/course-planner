const signInReducer = (
    state = {
        signInEmail: '',
        signInPassword: ''
    }, action) => {
        console.log(action)
    switch(action.type) {
        case 'SET_EMAIL':
            state.signInEmail = action.val;
            return state;
        case 'SET_PASSWORD':
            state.signInPassword = action.val;
            return state;
        case 'SIGN_IN':
            return state;
        default:
            return state;
    }
}

export default signInReducer;