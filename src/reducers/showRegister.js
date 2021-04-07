const showRegisterReducer = (state = false, action) => {
    switch(action.type) {
        case 'SHOW':
            state = !state;
        default:
            return false;
    }
}

export default showRegisterReducer;